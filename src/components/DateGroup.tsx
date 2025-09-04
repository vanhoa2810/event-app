import React from 'react';
import { EventRecord } from '../types/Event';
import EventCard from './EventCard';

interface Props {
  labelDay: string;
  labelWeekday: string;
  dateKey: string;
  events: EventRecord[];
  dotStatus: 'past' | 'current' | 'future';
}

export default function DateGroup({ labelDay, labelWeekday, events, dotStatus }: Props) {
  return (
    <section className="date-group" aria-label={`${labelDay} ${labelWeekday}`}>
      <div className="date-group__label">
        <div className={`date-group__dot date-group__dot--${dotStatus}`} />
        <span className="day">{labelDay}</span>
        <span className="weekday">{labelWeekday}</span>
      </div>
      <div className="events-stack">
        {events.map(ev => (
          <EventCard key={ev.id} event={ev}/>
        ))}
      </div>
    </section>
  );
}