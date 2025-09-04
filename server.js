const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data storage file
const DATA_FILE = 'events.json';

// Initialize events storage
async function initializeData() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // File doesn't exist, create it with empty array
        await fs.writeFile(DATA_FILE, JSON.stringify([]));
    }
}

// Helper functions
async function readEvents() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeEvents(events) {
    await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2));
}

// API Routes

// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await readEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Get single event
app.get('/api/events/:id', async (req, res) => {
    try {
        const events = await readEvents();
        const event = events.find(e => e.id === req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

// Create new event
app.post('/api/events', async (req, res) => {
    try {
        const { title, description, date, time, location } = req.body;
        
        if (!title || !date || !time) {
            return res.status(400).json({ error: 'Title, date, and time are required' });
        }

        const events = await readEvents();
        const newEvent = {
            id: Date.now().toString(),
            title,
            description: description || '',
            date,
            time,
            location: location || '',
            createdAt: new Date().toISOString()
        };

        events.push(newEvent);
        await writeEvents(events);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Update event
app.put('/api/events/:id', async (req, res) => {
    try {
        const events = await readEvents();
        const eventIndex = events.findIndex(e => e.id === req.params.id);
        
        if (eventIndex === -1) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const { title, description, date, time, location } = req.body;
        
        if (!title || !date || !time) {
            return res.status(400).json({ error: 'Title, date, and time are required' });
        }

        events[eventIndex] = {
            ...events[eventIndex],
            title,
            description: description || '',
            date,
            time,
            location: location || '',
            updatedAt: new Date().toISOString()
        };

        await writeEvents(events);
        res.json(events[eventIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// Delete event
app.delete('/api/events/:id', async (req, res) => {
    try {
        const events = await readEvents();
        const eventIndex = events.findIndex(e => e.id === req.params.id);
        
        if (eventIndex === -1) {
            return res.status(404).json({ error: 'Event not found' });
        }

        events.splice(eventIndex, 1);
        await writeEvents(events);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
initializeData().then(() => {
    app.listen(PORT, () => {
        console.log(`Event Management Server running on http://localhost:${PORT}`);
    });
});