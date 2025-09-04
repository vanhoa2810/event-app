import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EventCard from './EventCard';
export default function DateGroup({ labelDay, labelWeekday, events, dotStatus }) {
    return (_jsxs("section", { className: "date-group", "aria-label": `${labelDay} ${labelWeekday}`, children: [_jsxs("div", { className: "date-group__label", children: [_jsx("div", { className: `date-group__dot date-group__dot--${dotStatus}` }), _jsx("span", { className: "day", children: labelDay }), _jsx("span", { className: "weekday", children: labelWeekday })] }), _jsx("div", { className: "events-stack", children: events.map(ev => (_jsx(EventCard, { event: ev }, ev.id))) })] }));
}
