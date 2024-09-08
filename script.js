document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('upload-form');
    const statusDiv = document.getElementById('upload-status');
    const calendarEvents = document.getElementById('calendar-events');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        statusDiv.textContent = 'Uploading file...';
        
        fetch('http://localhost:5000/upload_calendar', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            statusDiv.textContent = 'File uploaded successfully!';
            displayEvents(data);
        })
        .catch(error => {
            console.error('Upload error:', error);
            statusDiv.textContent = 'Upload failed, please try again. Error: ' + error.message;
        });
    });

    function displayEvents(events) {
        calendarEvents.innerHTML = '';
        if (events.length === 0) {
            calendarEvents.innerHTML = '<p>No events found.</p>';
            return;
        }
        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event';
            eventDiv.innerHTML = `
                <h3>${event.summary}</h3>
                <p>Start time: ${new Date(event.start).toLocaleString()}</p>
                <p>End time: ${new Date(event.end).toLocaleString()}</p>
                <p>Location: ${event.location || 'Not specified'}</p>
            `;
            calendarEvents.appendChild(eventDiv);
        });
    }
});