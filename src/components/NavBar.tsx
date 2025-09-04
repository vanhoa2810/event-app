import React from 'react';

export default function NavBar() {
  return (
    <header className="navbar" role="banner">
      <div className="navbar__brand" aria-label="Brand">
        ◇
      </div>
      <nav className="navbar__links" aria-label="Primary">
        <a href="#" aria-current="page">Events</a>
        <a href="#">Calendars</a>
        <a href="#">Discover</a>
      </nav>
      <div className="navbar__right">
        <span>9:06 PM GMT+7</span>
        <button className="btn btn--primary" style={{height: 36}}>Create Event</button>
        <span aria-label="Notifications" role="button" tabIndex={0}>🔔</span>
        <span aria-label="User Profile" role="button" tabIndex={0}>🙂</span>
      </div>
    </header>
  );
}