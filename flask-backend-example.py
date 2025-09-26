# Flask Backend Example for Student Management System
# Install required packages: 
# pip install flask flask-cors psycopg2-binary requests python-dotenv

from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import requests
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Database configuration
DATABASE_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'database': os.getenv('DB_NAME', 'student_management'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'your_password'),
    'port': os.getenv('DB_PORT', 5432)
}

# Brevo API configuration
BREVO_API_KEY = os.getenv('BREVO_API_KEY')
BREVO_SMS_URL = 'https://api.brevo.com/v3/transactionalSMS/sms'
BREVO_WHATSAPP_URL = 'https://api.brevo.com/v3/whatsapp/sendMessage'

def get_db_connection():
    """Get PostgreSQL database connection"""
    return psycopg2.connect(**DATABASE_CONFIG)

@app.route('/api/students', methods=['GET'])
def get_students():
    """Get all students from PostgreSQL database"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT s.*, 
                   array_agg(sub.name || ':' || sub.obtained_marks || ':' || sub.total_marks || ':' || sub.grade) as subjects
            FROM students s
            LEFT JOIN subjects sub ON s.id = sub.student_id
            GROUP BY s.id
        """)
        
        students = cursor.fetchall()
        cursor.close()
        conn.close()
        
        # Convert to JSON format (you'll need to format this based on your DB schema)
        return jsonify([format_student_data(student) for student in students])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/send-notification', methods=['POST'])
def send_notification():
    """Send notification via Brevo API"""
    data = request.get_json()
    
    try:
        results = []
        
        if data['notification_type'] in ['sms', 'both']:
            sms_result = send_brevo_sms(
                data['parent_contact'], 
                data['message']
            )
            results.append(sms_result)
        
        if data['notification_type'] in ['whatsapp', 'both']:
            whatsapp_result = send_brevo_whatsapp(
                data['parent_whatsapp'], 
                data['message']
            )
            results.append(whatsapp_result)
        
        # Store notification in database
        store_notification(data, 'sent' if all(r['success'] for r in results) else 'failed')
        
        return jsonify({
            'success': True,
            'message': 'Notification sent successfully',
            'results': results
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/send-bulk-notifications', methods=['POST'])
def send_bulk_notifications():
    """Send bulk notifications via Brevo API"""
    data = request.get_json()
    students = data['students']
    
    results = []
    
    for student in students:
        try:
            # Send SMS via Brevo
            sms_result = send_brevo_sms(
                student['parent_contact'], 
                student['message']
            )
            
            # Send WhatsApp via Brevo
            whatsapp_result = send_brevo_whatsapp(
                student['parent_whatsapp'], 
                student['message']
            )
            
            results.append({
                'student_id': student['student_id'],
                'sms': sms_result,
                'whatsapp': whatsapp_result
            })
            
        except Exception as e:
            results.append({
                'student_id': student['student_id'],
                'error': str(e)
            })
    
    return jsonify({
        'success': True,
        'results': results
    })

def send_brevo_sms(phone_number, message):
    """Send SMS using Brevo API"""
    headers = {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
    }
    
    payload = {
        'type': 'transactional',
        'unicodeEnabled': True,
        'recipient': phone_number,
        'content': message,
        'sender': 'SchoolAI'  # Your sender name
    }
    
    response = requests.post(BREVO_SMS_URL, headers=headers, json=payload)
    
    return {
        'success': response.status_code == 201,
        'status_code': response.status_code,
        'response': response.json() if response.content else {}
    }

def send_brevo_whatsapp(phone_number, message):
    """Send WhatsApp message using Brevo API"""
    headers = {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
    }
    
    payload = {
        'whatsappBusinessAccountId': os.getenv('WHATSAPP_BUSINESS_ID'),
        'to': phone_number,
        'type': 'text',
        'text': {
            'body': message
        }
    }
    
    response = requests.post(BREVO_WHATSAPP_URL, headers=headers, json=payload)
    
    return {
        'success': response.status_code == 201,
        'status_code': response.status_code,
        'response': response.json() if response.content else {}
    }

def store_notification(data, status):
    """Store notification in PostgreSQL database"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO notifications (student_id, parent_contact, message, notification_type, status, created_at)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            data['student_id'],
            data['parent_contact'],
            data['message'],
            data['notification_type'],
            status,
            datetime.now()
        ))
        
        conn.commit()
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"Error storing notification: {e}")

def format_student_data(student_row):
    """Format student data from database row"""
    # You'll need to implement this based on your database schema
    # This is just an example structure
    return {
        'id': student_row[0],
        'name': student_row[1],
        'class': student_row[2],
        'rollNumber': student_row[3],
        'parentContact': student_row[4],
        'parentWhatsApp': student_row[5],
        'parentName': student_row[6],
        # Add other fields based on your schema
    }

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

# Create .env file with:
# DB_HOST=localhost
# DB_NAME=student_management  
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_PORT=5432
# BREVO_API_KEY=your_brevo_api_key
# WHATSAPP_BUSINESS_ID=your_whatsapp_business_id