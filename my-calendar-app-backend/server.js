const express = require('express');
const ICAL = require('ical.js');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/upload', (req, res) => {
    try {
        const jcalData = ICAL.parse(req.body.icsData);
        const comp = new ICAL.Component(jcalData);
        let eventsArray = [];

        comp.getAllSubcomponents('vevent').forEach(vevent => {
            const event = new ICAL.Event(vevent);
            eventsArray.push({
                title: event.summary,
                start: event.startDate.toJSDate(),
                end: event.endDate.toJSDate(),
            });

            if (event.isRecurring()) {
                const iterator = event.iterator();
                let next;
                while ((next = iterator.next())) {
                    if (next) {
                        eventsArray.push({
                            title: event.summary,
                            start: next.toJSDate(),
                            end: event.endDate.toJSDate(),
                            // 其他你想包含的细节
                        });
                    }
                }
            }
        });

        res.json(eventsArray);
    } catch (error) {
        console.error('Failed to process iCalendar data:', error);
        res.status(500).send("Failed to process iCalendar data");
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
