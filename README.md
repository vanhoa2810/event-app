# Event Management App

A modern, responsive web application for managing events and meetings. Built with Node.js, Express, and vanilla JavaScript with a clean, intuitive user interface.

## Features

- ✨ **Modern UI**: Clean, responsive design with smooth animations
- 📅 **Event Management**: Create, read, update, and delete events
- 🔍 **Search & Filter**: Find events by title, description, or location
- 📊 **Statistics Dashboard**: View total, today's, and upcoming events
- 🎯 **Date Filtering**: Filter events by today, this week, this month, or upcoming
- 📱 **Mobile Responsive**: Works perfectly on all device sizes
- 💾 **Local Storage**: Events stored in JSON file (no database required)

## Screenshots

The application features a modern interface with:
- Dashboard with event statistics
- Event cards with color-coded status indicators
- Modal forms for adding/editing events
- Search and filter functionality
- Responsive design for mobile and desktop

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vanhoa2810/event-app.git
   cd event-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## API Endpoints

The application provides a RESTful API for event management:

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an existing event
- `DELETE /api/events/:id` - Delete an event

## Event Data Structure

```json
{
  "id": "1693834567890",
  "title": "Team Meeting",
  "description": "Weekly team sync meeting",
  "date": "2024-09-15",
  "time": "14:30",
  "location": "Conference Room A",
  "createdAt": "2024-09-04T06:42:47.890Z"
}
```

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: JSON file-based storage
- **Icons**: Font Awesome 6
- **Styling**: CSS Grid, Flexbox, CSS Custom Properties

## Project Structure

```
event-app/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styles
│   └── script.js       # Frontend JavaScript
├── server.js           # Express server
├── package.json        # Dependencies and scripts
├── events.json         # Data storage (auto-generated)
└── README.md          # Project documentation
```

## Features in Detail

### Dashboard Statistics
- **Total Events**: Count of all events in the system
- **Today's Events**: Events scheduled for today
- **Upcoming Events**: Future events from today onwards

### Event Management
- **Create Events**: Add new events with title, description, date, time, and location
- **Edit Events**: Modify existing event details
- **Delete Events**: Remove events with confirmation dialog
- **View Events**: Display events in chronological order

### Search and Filter
- **Text Search**: Search by event title, description, or location
- **Date Filters**: 
  - All Events
  - Today
  - This Week
  - This Month
  - Upcoming

### Status Indicators
- **Today**: Orange badge for events happening today
- **Upcoming**: Blue badge for future events
- **Past**: Gray badge for past events

## Customization

### Styling
The application uses CSS custom properties for easy theming. You can modify colors, fonts, and spacing by updating the CSS variables in `public/styles.css`.

### Data Storage
Currently uses JSON file storage. Can be easily extended to use databases like MongoDB, PostgreSQL, or MySQL by modifying the data access functions in `server.js`.

### API Extension
The RESTful API can be extended with additional endpoints for features like:
- Event categories
- User management
- Calendar integrations
- Notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see package.json for details

## Support

For issues and questions, please open an issue on the GitHub repository.