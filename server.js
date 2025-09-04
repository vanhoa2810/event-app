const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MEETINGS_FILE = path.join(__dirname, 'data', 'meetings.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ensure data directory and meetings file exist
async function initializeData() {
    try {
        await fs.access(MEETINGS_FILE);
    } catch (error) {
        // File doesn't exist, create it with empty array
        await fs.writeFile(MEETINGS_FILE, JSON.stringify([]));
    }
}

// Helper function to read meetings
async function readMeetings() {
    try {
        const data = await fs.readFile(MEETINGS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading meetings:', error);
        return [];
    }
}

// Helper function to write meetings
async function writeMeetings(meetings) {
    try {
        await fs.writeFile(MEETINGS_FILE, JSON.stringify(meetings, null, 2));
    } catch (error) {
        console.error('Error writing meetings:', error);
        throw error;
    }
}

// API Routes

// Get all meetings
app.get('/api/meetings', async (req, res) => {
    try {
        const meetings = await readMeetings();
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meetings' });
    }
});

// Get a specific meeting
app.get('/api/meetings/:id', async (req, res) => {
    try {
        const meetings = await readMeetings();
        const meeting = meetings.find(m => m.id === req.params.id);
        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.json(meeting);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meeting' });
    }
});

// Create a new meeting
app.post('/api/meetings', async (req, res) => {
    try {
        const { title, description, date, time, location, participants } = req.body;
        
        if (!title || !date || !time) {
            return res.status(400).json({ error: 'Title, date, and time are required' });
        }

        const meetings = await readMeetings();
        const newMeeting = {
            id: Date.now().toString(),
            title,
            description: description || '',
            date,
            time,
            location: location || '',
            participants: participants || [],
            createdAt: new Date().toISOString()
        };

        meetings.push(newMeeting);
        await writeMeetings(meetings);
        res.status(201).json(newMeeting);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create meeting' });
    }
});

// Update a meeting
app.put('/api/meetings/:id', async (req, res) => {
    try {
        const meetings = await readMeetings();
        const index = meetings.findIndex(m => m.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        const { title, description, date, time, location, participants } = req.body;
        
        if (!title || !date || !time) {
            return res.status(400).json({ error: 'Title, date, and time are required' });
        }

        meetings[index] = {
            ...meetings[index],
            title,
            description: description || '',
            date,
            time,
            location: location || '',
            participants: participants || [],
            updatedAt: new Date().toISOString()
        };

        await writeMeetings(meetings);
        res.json(meetings[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update meeting' });
    }
});

// Delete a meeting
app.delete('/api/meetings/:id', async (req, res) => {
    try {
        const meetings = await readMeetings();
        const index = meetings.findIndex(m => m.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        meetings.splice(index, 1);
        await writeMeetings(meetings);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete meeting' });
    }
});

// Start server
async function startServer() {
    await initializeData();
    app.listen(PORT, () => {
        console.log(`Meeting Management Server running on port ${PORT}`);
        console.log(`Open http://localhost:${PORT} to access the application`);
    });
}

startServer().catch(console.error);