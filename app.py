from flask import Flask, request, jsonify
from icalendar import Calendar
from datetime import datetime
import pytz

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/parse', methods=['POST'])
def parse_calendar():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.ics'):
        try:
            cal = Calendar.from_ical(file.read())
            events = []
            for component in cal.walk():
                if component.name == "VEVENT":
                    event = {
                        'summary': str(component.get('summary')),
                        'start': component.get('dtstart').dt.strftime('%Y-%m-%d %H:%M:%S'),
                        'end': component.get('dtend').dt.strftime('%Y-%m-%d %H:%M:%S'),
                        'location': str(component.get('location', 'N/A'))
                    }
                    events.append(event)
            return jsonify(events)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Invalid file format'}), 400

if __name__ == '__main__':
    app.run(debug=True)