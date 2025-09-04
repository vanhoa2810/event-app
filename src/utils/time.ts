export function formatTimeRange(startISO: string, endISO: string, tzLabel: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const fmt = (d: Date) =>
    d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  return {
    start: fmt(start),
    end: fmt(end),
    tz: tzLabel
  };
}

export function addMinutes(date: Date, mins: number) {
  return new Date(date.getTime() + mins * 60000);
}

export function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function groupEventsByDay<T extends { start: string }>(items: T[]) {
  const map = new Map<string, T[]>();
  items.forEach(ev => {
    const d = new Date(ev.start);
    const key = d.toISOString().substring(0, 10);
    const arr = map.get(key) || [];
    arr.push(ev);
    map.set(key, arr);
  });
  // Sort days ascending
  return Array.from(map.entries())
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([day, arr]) => ({
      day,
      events: arr.sort((a,b) => a.start.localeCompare(b.start))
    }));
}