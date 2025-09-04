import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { groupEventsByDay } from '../utils/time';
import DateGroup from './DateGroup';
function formatLabel(dateISO) {
    const d = new Date(dateISO);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 86400000);
    let dayLabel = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    if (d.toDateString() === today.toDateString())
        dayLabel = 'Today';
    else if (d.toDateString() === tomorrow.toDateString())
        dayLabel = 'Tomorrow';
    const weekday = d.toLocaleDateString(undefined, { weekday: 'long' });
    return { dayLabel, weekday };
}
export default function Timeline({ events }) {
    const grouped = groupEventsByDay(events);
    const now = new Date();
    return (_jsxs("div", { className: "timeline", role: "list", children: [_jsx("div", { className: "timeline__line", "aria-hidden": "true" }), grouped.map(({ day, events: evs }) => {
                const dateObj = new Date(day);
                let status = 'future';
                if (dateObj < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
                    status = 'past';
                }
                else if (dateObj.toDateString() === now.toDateString()) {
                    status = 'current';
                }
                const { dayLabel, weekday } = formatLabel(day);
                return (_jsx(DateGroup, { dateKey: day, labelDay: dayLabel, labelWeekday: weekday, events: evs, dotStatus: status }, day));
            })] }));
}
