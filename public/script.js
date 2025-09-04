// Event Management App JavaScript

class EventManager {
    constructor() {
        this.events = [];
        this.editingEventId = null;
        this.init();
    }

    // Initialize the application
    init() {
        this.bindEvents();
        this.loadEvents();
        this.setDefaultDate();
    }

    // Bind event listeners
    bindEvents() {
        // Modal controls
        document.getElementById('addEventBtn').addEventListener('click', () => this.openModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('eventForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Confirm modal controls
        document.getElementById('closeConfirmModal').addEventListener('click', () => this.closeConfirmModal());
        document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.closeConfirmModal());
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.confirmDelete());
        
        // Search and filter
        document.getElementById('searchInput').addEventListener('input', () => this.filterEvents());
        document.getElementById('dateFilter').addEventListener('change', () => this.filterEvents());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('eventModal');
            const confirmModal = document.getElementById('confirmModal');
            if (e.target === modal) this.closeModal();
            if (e.target === confirmModal) this.closeConfirmModal();
        });
    }

    // Set default date to today
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('eventDate').value = today;
    }

    // Load events from API
    async loadEvents() {
        try {
            const response = await fetch('/api/events');
            this.events = await response.json();
            this.updateStats();
            this.renderEvents();
        } catch (error) {
            console.error('Error loading events:', error);
            this.showMessage('Failed to load events', 'error');
        }
    }

    // Update statistics
    updateStats() {
        const today = new Date().toDateString();
        const now = new Date();
        
        const totalEvents = this.events.length;
        const todayEvents = this.events.filter(event => 
            new Date(event.date).toDateString() === today
        ).length;
        const upcomingEvents = this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= now;
        }).length;

        document.getElementById('totalEvents').textContent = totalEvents;
        document.getElementById('todayEvents').textContent = todayEvents;
        document.getElementById('upcomingEvents').textContent = upcomingEvents;
    }

    // Render events
    renderEvents(eventsToRender = null) {
        const container = document.getElementById('eventsContainer');
        const noEventsDiv = document.getElementById('noEvents');
        const events = eventsToRender || this.events;

        if (events.length === 0) {
            container.innerHTML = '';
            noEventsDiv.style.display = 'block';
            return;
        }

        noEventsDiv.style.display = 'none';
        
        // Sort events by date and time
        const sortedEvents = events.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });

        container.innerHTML = sortedEvents.map(event => this.createEventCard(event)).join('');
    }

    // Create event card HTML
    createEventCard(event) {
        const eventDate = new Date(event.date);
        const today = new Date();
        const isToday = eventDate.toDateString() === today.toDateString();
        const isPast = eventDate < today && !isToday;
        
        let statusClass = 'status-upcoming';
        let statusText = 'Upcoming';
        
        if (isToday) {
            statusClass = 'status-today';
            statusText = 'Today';
        } else if (isPast) {
            statusClass = 'status-past';
            statusText = 'Past';
        }

        const formattedDate = this.formatDate(event.date);
        const formattedTime = this.formatTime(event.time);

        return `
            <div class="event-card">
                <div class="event-header">
                    <div>
                        <div class="event-status ${statusClass}">${statusText}</div>
                        <h3 class="event-title">${this.escapeHtml(event.title)}</h3>
                        <div class="event-datetime">
                            <div><i class="fas fa-calendar"></i> ${formattedDate}</div>
                            <div><i class="fas fa-clock"></i> ${formattedTime}</div>
                        </div>
                    </div>
                    <div class="event-actions">
                        <button class="btn btn-secondary btn-small" onclick="eventManager.editEvent('${event.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-small" onclick="eventManager.deleteEvent('${event.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
                ${event.description ? `<div class="event-description">${this.escapeHtml(event.description)}</div>` : ''}
                ${event.location ? `<div class="event-location"><i class="fas fa-map-marker-alt"></i> ${this.escapeHtml(event.location)}</div>` : ''}
            </div>
        `;
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Format time for display
    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Filter events based on search and date filter
    filterEvents() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const dateFilter = document.getElementById('dateFilter').value;
        
        let filteredEvents = this.events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                                event.description.toLowerCase().includes(searchTerm) ||
                                event.location.toLowerCase().includes(searchTerm);
            
            const eventDate = new Date(event.date);
            const today = new Date();
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
            
            let matchesDate = true;
            
            switch (dateFilter) {
                case 'today':
                    matchesDate = eventDate.toDateString() === today.toDateString();
                    break;
                case 'week':
                    matchesDate = eventDate >= today && eventDate <= weekFromNow;
                    break;
                case 'month':
                    matchesDate = eventDate >= today && eventDate <= monthFromNow;
                    break;
                case 'upcoming':
                    matchesDate = eventDate >= today;
                    break;
                default:
                    matchesDate = true;
            }
            
            return matchesSearch && matchesDate;
        });
        
        this.renderEvents(filteredEvents);
    }

    // Open modal for adding/editing event
    openModal(eventId = null) {
        const modal = document.getElementById('eventModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('eventForm');
        
        this.editingEventId = eventId;
        
        if (eventId) {
            const event = this.events.find(e => e.id === eventId);
            modalTitle.textContent = 'Edit Event';
            
            document.getElementById('eventTitle').value = event.title;
            document.getElementById('eventDescription').value = event.description;
            document.getElementById('eventDate').value = event.date;
            document.getElementById('eventTime').value = event.time;
            document.getElementById('eventLocation').value = event.location;
        } else {
            modalTitle.textContent = 'Add New Event';
            form.reset();
            this.setDefaultDate();
        }
        
        modal.style.display = 'block';
        document.getElementById('eventTitle').focus();
    }

    // Close modal
    closeModal() {
        document.getElementById('eventModal').style.display = 'none';
        document.getElementById('eventForm').reset();
        this.editingEventId = null;
    }

    // Handle form submission
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            title: document.getElementById('eventTitle').value.trim(),
            description: document.getElementById('eventDescription').value.trim(),
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value.trim()
        };

        if (!formData.title || !formData.date || !formData.time) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }

        try {
            let response;
            if (this.editingEventId) {
                response = await fetch(`/api/events/${this.editingEventId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                response = await fetch('/api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }

            if (response.ok) {
                this.closeModal();
                this.loadEvents();
                this.showMessage(
                    this.editingEventId ? 'Event updated successfully!' : 'Event created successfully!',
                    'success'
                );
            } else {
                const error = await response.json();
                this.showMessage(error.error || 'Failed to save event', 'error');
            }
        } catch (error) {
            console.error('Error saving event:', error);
            this.showMessage('Failed to save event', 'error');
        }
    }

    // Edit event
    editEvent(eventId) {
        this.openModal(eventId);
    }

    // Delete event
    deleteEvent(eventId) {
        this.eventToDelete = eventId;
        document.getElementById('confirmModal').style.display = 'block';
    }

    // Close confirmation modal
    closeConfirmModal() {
        document.getElementById('confirmModal').style.display = 'none';
        this.eventToDelete = null;
    }

    // Confirm delete
    async confirmDelete() {
        if (!this.eventToDelete) return;

        try {
            const response = await fetch(`/api/events/${this.eventToDelete}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.closeConfirmModal();
                this.loadEvents();
                this.showMessage('Event deleted successfully!', 'success');
            } else {
                this.showMessage('Failed to delete event', 'error');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            this.showMessage('Failed to delete event', 'error');
        }
    }

    // Show message
    showMessage(text, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        const message = document.createElement('div');
        message.className = `message message-${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${text}
        `;

        const container = document.querySelector('.main-content');
        container.insertBefore(message, container.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.eventManager = new EventManager();
});