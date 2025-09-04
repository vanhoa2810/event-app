# Meeting Management App

A simple and intuitive web application for managing meetings. Create, view, edit, and delete meetings with an easy-to-use interface.

![Meeting Management App Interface](https://github.com/user-attachments/assets/ca29fdd6-ebc0-4e65-b79e-57c63f9c13ee)

## Features

- ✅ **Create Meetings**: Add new meetings with title, description, date, time, location, and participants
- ✅ **View Meetings**: Display all upcoming meetings in a clean, organized layout
- ✅ **Edit Meetings**: Modify existing meeting details
- ✅ **Delete Meetings**: Remove meetings with confirmation dialog
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **REST API**: Full API for programmatic access to meeting data

![New Meeting Modal](https://github.com/user-attachments/assets/9602b878-6b15-4db5-9c7a-1923f7ed50d4)

## Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Data Storage**: JSON file-based storage
- **Styling**: Modern CSS with responsive design

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vanhoa2810/event-app.git
   cd event-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Web Interface

1. **View Meetings**: The main page displays all upcoming meetings
2. **Create Meeting**: Click "New Meeting" button and fill out the form
3. **Edit Meeting**: Click "Edit" button on any meeting card
4. **Delete Meeting**: Click "Delete" button and confirm the action

### API Endpoints

The application provides a REST API for programmatic access:

- `GET /api/meetings` - Get all meetings
- `GET /api/meetings/:id` - Get a specific meeting
- `POST /api/meetings` - Create a new meeting
- `PUT /api/meetings/:id` - Update a meeting
- `DELETE /api/meetings/:id` - Delete a meeting

#### Example API Usage

**Create a meeting**:
```bash
curl -X POST http://localhost:3000/api/meetings \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Team Standup",
    "description": "Daily team synchronization",
    "date": "2024-09-05",
    "time": "09:00",
    "location": "Conference Room A",
    "participants": ["alice@example.com", "bob@example.com"]
  }'
```

**Get all meetings**:
```bash
curl http://localhost:3000/api/meetings
```

## Project Structure

```
event-app/
├── server.js              # Express server and API routes
├── package.json           # Node.js dependencies and scripts
├── data/
│   └── meetings.json      # Meeting data storage
└── public/
    ├── index.html         # Main HTML file
    ├── styles.css         # CSS styling
    └── script.js          # Frontend JavaScript
```

## Development

### Running in Development Mode

```bash
npm run dev
```

### Adding New Features

1. **Backend**: Modify `server.js` to add new API endpoints
2. **Frontend**: Update `public/script.js` for new functionality
3. **Styling**: Add CSS rules to `public/styles.css`

### Data Storage

Meetings are stored in `data/meetings.json`. The file is automatically created on first run. Each meeting has the following structure:

```json
{
  "id": "unique-timestamp",
  "title": "Meeting Title",
  "description": "Meeting Description",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "location": "Meeting Location",
  "participants": ["email1@example.com", "email2@example.com"],
  "createdAt": "ISO-timestamp",
  "updatedAt": "ISO-timestamp"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see package.json for details

## Support

If you encounter any issues or have questions, please open an issue on GitHub.