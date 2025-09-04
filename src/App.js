import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import NavBar from './components/NavBar';
import SegmentedControl from './components/SegmentedControl';
import Timeline from './components/Timeline';
import { events } from './data/events';
const segments = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' }
];
export default function App() {
    const [segment, setSegment] = useState('upcoming');
    const filtered = useMemo(() => {
        const now = new Date();
        return events.filter(e => segment === 'upcoming' ? new Date(e.end) >= now : new Date(e.end) < now);
    }, [segment]);
    return (_jsxs("div", { className: "app-root", children: [_jsx(NavBar, {}), _jsxs("main", { className: "content-frame", "aria-labelledby": "events-heading", children: [_jsxs("div", { className: "content-header", children: [_jsx("h1", { id: "events-heading", className: "page-title", children: "Events" }), _jsx(SegmentedControl, { options: segments, value: segment, onChange: setSegment, ariaLabel: "Filter events by time" })] }), _jsx(Timeline, { events: filtered })] })] }));
}
