import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
export default function Tag({ type = 'default', children, withDot }) {
    return (_jsxs("span", { className: clsx('tag', {
            'tag--live': type === 'live',
            'tag--going': type === 'going'
        }), children: [withDot && _jsx("span", { className: "live-dot", "aria-hidden": "true" }), children] }));
}
