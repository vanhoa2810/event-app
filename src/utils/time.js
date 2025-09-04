export function formatTimeRange(startISO, endISO, tzLabel) {
    const start = new Date(startISO);
    const end = new Date(endISO);
    const fmt = (d) => d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return {
        start: fmt(start),
        end: fmt(end),
        tz: tzLabel
    };
}
export function addMinutes(date, mins) {
    return new Date(date.getTime() + mins * 60000);
}
export function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}
export function groupEventsByDay(items) {
    const map = new Map();
    items.forEach(ev => {
        const d = new Date(ev.start);
        const key = d.toISOString().substring(0, 10);
        const arr = map.get(key) || [];
        arr.push(ev);
        map.set(key, arr);
    });
    // Sort days ascending
    return Array.from(map.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([day, arr]) => ({
        day,
        events: arr.sort((a, b) => a.start.localeCompare(b.start))
    }));
}
