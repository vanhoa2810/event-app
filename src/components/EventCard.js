import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { formatTimeRange } from '../utils/time';
import Tag from './Tag';
import Button from './Button';
import AvatarGroup from './AvatarGroup';
import clsx from 'clsx';
export default function EventCard({ event }) {
    const { start, end, tz } = formatTimeRange(event.start, event.end, event.tzOffsetLabel);
    const isLive = event.status === 'live';
    const going = event.goingIds?.length ?? 0;
    return (_jsxs("article", { className: "event-card", "aria-label": event.title, children: [_jsxs("div", { className: "event-card__body", children: [_jsxs("div", { className: "event-card__times", children: [isLive && _jsx(Tag, { type: "live", withDot: true, children: "LIVE" }), _jsx("span", { children: start }), _jsx("span", { style: { opacity: .4 }, children: "\u2013" }), _jsxs("span", { className: "end", children: [end, " ", tz] })] }), _jsx("h2", { className: "event-card__title", children: event.title }), _jsxs("div", { className: "meta-list", children: [_jsxs("div", { className: "meta-row", children: [_jsx("span", { role: "img", "aria-label": "host", children: "\uD83D\uDC64" }), _jsxs("span", { children: ["By ", event.hosts.map(h => h.name).join(' & ')] })] }), _jsxs("div", { className: "meta-row", children: [event.venueType === 'virtual'
                                        ? _jsx("span", { role: "img", "aria-label": "video", children: "\uD83D\uDCBB" })
                                        : _jsx("span", { role: "img", "aria-label": "location", children: "\uD83D\uDCCD" }), _jsx("span", { children: event.venueLabel })] }), _jsxs("div", { className: "meta-row", children: [_jsx("span", { role: "img", "aria-label": "guests", children: "\uD83D\uDC65" }), _jsxs("span", { children: [event.guestsCount || 0, " ", event.guestsCount === 1 ? 'guest' : 'guests'] })] })] }), _jsxs("div", { className: "actions-row", children: [isLive && _jsx(Button, { variant: "secondary", children: "Check In" }), _jsxs(Button, { variant: "secondary", children: [isLive ? 'Manage' : 'Manage Event', " \u25B8"] }), going > 0 && _jsx(Tag, { type: "going", children: "Going" }), going > 0 && _jsx(AvatarGroup, { ids: event.goingIds || [] })] })] }), _jsx("div", { className: clsx('event-card__thumb', event.imageType === 'ruby' && 'event-card__thumb--ruby'), "aria-hidden": "true", children: event.imageType === 'ruby' ? (_jsxs("div", { style: { padding: 8, textAlign: 'center' }, children: ["RubySG", _jsx("br", {}), "November", _jsx("br", {}), "Meetup"] })) : (_jsx(_Fragment, { children: _jsx("div", { className: "thumb-overlay", children: "Meetup" }) })) })] }));
}
