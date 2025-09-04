import { EventRecord } from '../types/Event';
import { addMinutes } from '../utils/time';

const now = new Date();
const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0);

export const events: EventRecord[] = [
  {
    id: '1',
    title: 'Tech Meetup',
    start: todayStart.toISOString(),
    end: addMinutes(todayStart, 60).toISOString(),
    venueType: 'in_person',
    venueLabel: 'Hotel Classic by Venue',
    hosts: [{ id: 'h1', name: 'Host A' }],
    guestsCount: 3,
    goingIds: ['u1','u2','u3'],
    status: 'live',
    imageType: 'photo',
    tzOffsetLabel: 'GMT+8'
  },
  {
    id: '2',
    title: 'Ruby SG November Meetup',
    start: addMinutes(todayStart, 150).toISOString(),
    end: addMinutes(todayStart, 210).toISOString(),
    venueType: 'in_person',
    venueLabel: 'ARC 380',
    hosts: [
      { id: 'h2', name: 'Ted Johansson' },
      { id: 'h3', name: 'Onur Ozer' }
    ],
    guestsCount: 29,
    goingIds: ['u1','u2','u3','u4','u5'],
    status: 'upcoming',
    imageType: 'ruby',
    tzOffsetLabel: 'GMT+8'
  },
  {
    id: '3',
    title: 'Tech Meetup',
    start: addMinutes(todayStart, 360).toISOString(),
    end: addMinutes(todayStart, 420).toISOString(),
    venueType: 'virtual',
    venueLabel: 'Zoom',
    hosts: [{ id: 'h1', name: 'Host A' }],
    guestsCount: 0,
    goingIds: [],
    status: 'upcoming',
    imageType: 'photo',
    tzOffsetLabel: 'GMT+8'
  },
  {
    id: '4',
    title: 'Tech Meetup',
    start: addMinutes(todayStart, 540).toISOString(),
    end: addMinutes(todayStart, 600).toISOString(),
    venueType: 'in_person',
    venueLabel: 'Hotel Classic',
    hosts: [{ id: 'h4', name: 'Jane Doe' }],
    guestsCount: 10,
    goingIds: ['u1','u2','u3','u4'],
    status: 'upcoming',
    imageType: 'photo',
    tzOffsetLabel: 'GMT+8'
  }
];