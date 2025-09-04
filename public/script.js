class MeetingManager {
    constructor() {
        this.meetings = [];
        this.currentEditingId = null;
        this.initializeEventListeners();
        this.loadMeetings();
    }

    initializeEventListeners() {
        // Modal controls
        const modal = document.getElementById('meetingModal');
        const deleteModal = document.getElementById('deleteModal');
        const newMeetingBtn = document.getElementById('newMeetingBtn');
        const closeBtn = document.querySelector('.close');
        const cancelBtn = document.getElementById('cancelBtn');
        const meetingForm = document.getElementById('meetingForm');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

        // New meeting button
        newMeetingBtn.addEventListener('click', () => this.openModal());

        // Close modal
        closeBtn.addEventListener('click', () => this.closeModal());
        cancelBtn.addEventListener('click', () => this.closeModal());

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.closeModal();
            }
            if (event.target === deleteModal) {
                this.closeDeleteModal();
            }
        });

        // Form submission
        meetingForm.addEventListener('submit', (e) => this.handleSubmit(e));

        // Delete modal controls
        cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModal());
        confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());

        // Set default date to today
        document.getElementById('date').valueAsDate = new Date();
    }

    async loadMeetings() {
        try {
            this.showLoading();
            const response = await fetch('/api/meetings');
            if (!response.ok) throw new Error('Failed to load meetings');
            
            this.meetings = await response.json();
            this.renderMeetings();
        } catch (error) {
            this.showError('Failed to load meetings. Please try again.');
            console.error('Error loading meetings:', error);
        }
    }

    renderMeetings() {
        const container = document.getElementById('meetingsContainer');
        
        if (this.meetings.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No meetings scheduled</h3>
                    <p>Click "New Meeting" to create your first meeting.</p>
                </div>
            `;
            return;
        }

        // Sort meetings by date and time
        const sortedMeetings = [...this.meetings].sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });

        container.innerHTML = sortedMeetings.map(meeting => this.createMeetingCard(meeting)).join('');
    }

    createMeetingCard(meeting) {
        const meetingDate = new Date(`${meeting.date}T${meeting.time}`);
        const now = new Date();
        const isPast = meetingDate < now;
        
        const formattedDate = meetingDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const formattedTime = meetingDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const participants = Array.isArray(meeting.participants) 
            ? meeting.participants.filter(p => p.trim()).join(', ')
            : (meeting.participants || '').split('\n').filter(p => p.trim()).join(', ');

        return `
            <div class="meeting-card ${isPast ? 'past-meeting' : ''}">
                <div class="meeting-header">
                    <div>
                        <div class="meeting-title">${this.escapeHtml(meeting.title)}</div>
                        <div class="meeting-datetime">${formattedDate} at ${formattedTime}</div>
                    </div>
                    <div class="meeting-actions">
                        <button class="btn btn-primary btn-small" onclick="meetingManager.editMeeting('${meeting.id}')">
                            Edit
                        </button>
                        <button class="btn btn-danger btn-small" onclick="meetingManager.deleteMeeting('${meeting.id}')">
                            Delete
                        </button>
                    </div>
                </div>
                
                ${meeting.description ? `<div class="meeting-description">${this.escapeHtml(meeting.description)}</div>` : ''}
                
                <div class="meeting-details">
                    ${meeting.location ? `
                        <span class="meeting-label">Location:</span>
                        <span class="meeting-value">${this.escapeHtml(meeting.location)}</span>
                    ` : ''}
                    
                    ${participants ? `
                        <span class="meeting-label">Participants:</span>
                        <span class="meeting-value">${this.escapeHtml(participants)}</span>
                    ` : ''}
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    openModal(meeting = null) {
        const modal = document.getElementById('meetingModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('meetingForm');

        if (meeting) {
            modalTitle.textContent = 'Edit Meeting';
            this.currentEditingId = meeting.id;
            this.populateForm(meeting);
        } else {
            modalTitle.textContent = 'New Meeting';
            this.currentEditingId = null;
            form.reset();
            document.getElementById('date').valueAsDate = new Date();
        }

        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('meetingModal');
        modal.style.display = 'none';
        this.currentEditingId = null;
    }

    populateForm(meeting) {
        document.getElementById('title').value = meeting.title;
        document.getElementById('description').value = meeting.description || '';
        document.getElementById('date').value = meeting.date;
        document.getElementById('time').value = meeting.time;
        document.getElementById('location').value = meeting.location || '';
        
        const participants = Array.isArray(meeting.participants) 
            ? meeting.participants.join('\n')
            : (meeting.participants || '');
        document.getElementById('participants').value = participants;
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const meetingData = {
            title: formData.get('title'),
            description: formData.get('description'),
            date: formData.get('date'),
            time: formData.get('time'),
            location: formData.get('location'),
            participants: formData.get('participants').split('\n').filter(p => p.trim())
        };

        try {
            let response;
            if (this.currentEditingId) {
                response = await fetch(`/api/meetings/${this.currentEditingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(meetingData)
                });
            } else {
                response = await fetch('/api/meetings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(meetingData)
                });
            }

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save meeting');
            }

            this.closeModal();
            await this.loadMeetings();
            this.showSuccess(this.currentEditingId ? 'Meeting updated successfully!' : 'Meeting created successfully!');
        } catch (error) {
            this.showError(error.message);
            console.error('Error saving meeting:', error);
        }
    }

    async editMeeting(id) {
        const meeting = this.meetings.find(m => m.id === id);
        if (meeting) {
            this.openModal(meeting);
        }
    }

    deleteMeeting(id) {
        this.meetingToDelete = id;
        document.getElementById('deleteModal').style.display = 'block';
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').style.display = 'none';
        this.meetingToDelete = null;
    }

    async confirmDelete() {
        if (!this.meetingToDelete) return;

        try {
            const response = await fetch(`/api/meetings/${this.meetingToDelete}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete meeting');

            this.closeDeleteModal();
            await this.loadMeetings();
            this.showSuccess('Meeting deleted successfully!');
        } catch (error) {
            this.showError('Failed to delete meeting. Please try again.');
            console.error('Error deleting meeting:', error);
        }
    }

    showLoading() {
        document.getElementById('meetingsContainer').innerHTML = `
            <div class="loading">Loading meetings...</div>
        `;
    }

    showError(message) {
        this.removeMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        document.querySelector('main').insertBefore(errorDiv, document.getElementById('meetingsList'));
        
        setTimeout(() => this.removeMessages(), 5000);
    }

    showSuccess(message) {
        this.removeMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'error'; // Reusing error styles but with success colors
        successDiv.style.backgroundColor = '#d4edda';
        successDiv.style.color = '#155724';
        successDiv.style.borderColor = '#c3e6cb';
        successDiv.textContent = message;
        document.querySelector('main').insertBefore(successDiv, document.getElementById('meetingsList'));
        
        setTimeout(() => this.removeMessages(), 3000);
    }

    removeMessages() {
        const messages = document.querySelectorAll('.error');
        messages.forEach(msg => msg.remove());
    }
}

// Initialize the application
const meetingManager = new MeetingManager();