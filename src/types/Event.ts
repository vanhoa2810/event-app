export interface Host {
  id: string;
  name: string;
  avatar?: string;
}

export interface EventRecord {
  id: string;
  title: string;
  start: string;  // ISO date
  end: string;
  venueType: 'in_person' | 'virtual';
  venueLabel: string;
  hosts: Host[];
  guestsCount: number;
  goingIds?: string[];
  status: 'live' | 'upcoming' | 'past';
  imageType: 'photo' | 'ruby';
  tzOffsetLabel: string;
}