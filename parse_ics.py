from icalendar import Calendar, Event
from datetime import datetime
import pytz

def parse_ics_file(file_path):
    with open(file_path, 'rb') as file:
        cal = Calendar.from_ical(file.read())
    
    events = []
    for component in cal.walk():
        if component.name == "VEVENT":
            event = {
                'summary': component.get('summary'),
                'start': component.get('dtstart').dt,
                'end': component.get('dtend').dt,
                'location': component.get('location'),
                'rrule': component.get('rrule'),
                'categories': component.get('categories'),
                'uid': component.get('uid')
            }
            events.append(event)
    
    return events

def format_event(event):
    tz = pytz.timezone('Canada/Mountain')
    return {
        'summary': str(event['summary']),
        'start': event['start'].astimezone(tz).isoformat(),
        'end': event['end'].astimezone(tz).isoformat(),
        'location': str(event['location']),
        'rrule': str(event['rrule']) if event['rrule'] else None,
        'categories': [str(cat) for cat in event['categories']] if event['categories'] else [],
        'uid': str(event['uid'])
    }

# 使用示例
if __name__ == "__main__":
    file_path = 'path_to_your_ics_file.ics'
    events = parse_ics_file(file_path)
    formatted_events = [format_event(event) for event in events]
    
    for event in formatted_events:
        print(event)