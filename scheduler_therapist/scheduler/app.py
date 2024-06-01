from flask import Flask, request, jsonify
from google.oauth2 import service_account
from googleapiclient.discovery import build
import datetime

app = Flask(__name__)

# Load credentials and create a service object for the Google Calendar API
credentials = service_account.Credentials.from_service_account_file('credentials.json', scopes=['https://www.googleapis.com/auth/calendar'])
service = build('calendar', 'v3', credentials=credentials)

# Endpoint to fetch available therapists
@app.route('/therapists', methods=['GET'])
def get_therapists():
    therapists = [
        {"id": 1, "name": "Therapist A", "calendar_id": "therapist_a_calendar_id"},
        {"id": 2, "name": "Therapist B", "calendar_id": "therapist_b_calendar_id"}
    ]
    return jsonify(therapists)

# Endpoint to fetch available time slots for a therapist
@app.route('/timeslots', methods=['GET'])
def get_timeslots():
    calendar_id = request.args.get('calendar_id')
    start_time = request.args.get('start_time')
    end_time = request.args.get('end_time')

    events_result = service.events().list(
        calendarId=calendar_id,
        timeMin=start_time,
        timeMax=end_time,
        singleEvents=True,
        orderBy='startTime'
    ).execute()
    
    events = events_result.get('items', [])

    timeslots = []
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        end = event['end'].get('dateTime', event['end'].get('date'))
        timeslots.append({"start": start, "end": end})

    return jsonify(timeslots)

# Endpoint to book an appointment
@app.route('/book', methods=['POST'])
def book_appointment():
    data = request.json
    calendar_id = data['calendar_id']
    start_time = data['start_time']
    end_time = data['end_time']
    summary = data['summary']
    description = data['description']

    event = {
        'summary': summary,
        'description': description,
        'start': {
            'dateTime': start_time,
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': end_time,
            'timeZone': 'America/Los_Angeles',
        },
    }

    event = service.events().insert(calendarId=calendar_id, body=event).execute()

    return jsonify(event)

if __name__ == '__main__':
    app.run(debug=True)
