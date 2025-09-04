import React from 'react';
import { EventRecord } from '../types/Event';
import { formatTimeRange } from '../utils/time';
import Tag from './Tag';
import Button from './Button';
import AvatarGroup from './AvatarGroup';
import clsx from 'clsx';

interface Props {
  event: EventRecord;
  isCurrentDay?: boolean;
}

export default function EventCard({ event }: Props) {
  const { start, end, tz } = formatTimeRange(event.start, event.end, event.tzOffsetLabel);
  const isLive = event.status === 'live';
  const going = event.goingIds?.length ?? 0;

  return (
    <article className="event-card" aria-label={event.title}>
      <div className="event-card__body">
        <div className="event-card__times">
          {isLive && <Tag type="live" withDot>LIVE</Tag>}
          <span>{start}</span>
          <span style={{opacity:.4}}>–</span>
          <span className="end">{end} {tz}</span>
        </div>
        <h2 className="event-card__title">{event.title}</h2>
        <div className="meta-list">
          <div className="meta-row">
            <span role="img" aria-label="host">👤</span>
            <span>
              By {event.hosts.map(h => h.name).join(' & ')}
            </span>
          </div>
          <div className="meta-row">
            {event.venueType === 'virtual'
              ? <span role="img" aria-label="video">💻</span>
              : <span role="img" aria-label="location">📍</span>
            }
            <span>{event.venueLabel}</span>
          </div>
          <div className="meta-row">
            <span role="img" aria-label="guests">👥</span>
            <span>{event.guestsCount || 0} {event.guestsCount === 1 ? 'guest' : 'guests'}</span>
          </div>
        </div>
        <div className="actions-row">
          {isLive && <Button variant="secondary">Check In</Button>}
          <Button variant="secondary">
            {isLive ? 'Manage' : 'Manage Event'} ▸
          </Button>
          {going > 0 && <Tag type="going">Going</Tag>}
          {going > 0 && <AvatarGroup ids={event.goingIds || []} />}
        </div>
      </div>
      <div
        className={clsx('event-card__thumb', event.imageType === 'ruby' && 'event-card__thumb--ruby')}
        aria-hidden="true"
      >
        {event.imageType === 'ruby' ? (
          <div style={{padding:8,textAlign:'center'}}>
            RubySG<br/>November<br/>Meetup
          </div>
        ) : (
          <>
            <div className="thumb-overlay">Meetup</div>
          </>
        )}
      </div>
    </article>
  );
}