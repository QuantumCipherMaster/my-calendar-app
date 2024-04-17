import React, { useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function App() {
    const [events, setEvents] = useState([]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            const text = e.target.result;
            try {
                const response = await axios.post('http://localhost:3000/upload', { icsData: text });
                setEvents(response.data.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end)
                })));
            } catch (error) {
                console.error('Error uploading ICS file:', error);
            }
        };
        
        reader.readAsText(file);
    };

    return (
        <div className="App">
            <input type="file" onChange={handleFileChange} accept=".ics" />
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    );
}

export default App;
