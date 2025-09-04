import React, { useState, useMemo } from 'react';
import NavBar from './components/NavBar';
import SegmentedControl, { SegmentOption } from './components/SegmentedControl';
import Timeline from './components/Timeline';
import { events } from './data/events';
import { EventRecord } from './types/Event';

const segments: SegmentOption[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' }
];

export default function App() {
  const [segment, setSegment] = useState<string>('upcoming');

  const filtered: EventRecord[] = useMemo(() => {
    const now = new Date();
    return events.filter(e =>
      segment === 'upcoming' ? new Date(e.end) >= now : new Date(e.end) < now
    );
  }, [segment]);

  return (
    <div className="app-root">
      <NavBar />
      <main className="content-frame" aria-labelledby="events-heading">
        <div className="content-header">
          <h1 id="events-heading" className="page-title">Events</h1>
          <SegmentedControl
            options={segments}
            value={segment}
            onChange={setSegment}
            ariaLabel="Filter events by time"
          />
        </div>
        <Timeline events={filtered} />
      </main>
    </div>
  );
}