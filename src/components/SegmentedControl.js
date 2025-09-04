import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
export default function SegmentedControl({ options, value, onChange, ariaLabel }) {
    return (_jsx("div", { className: "segmented", role: "group", "aria-label": ariaLabel, children: options.map(opt => (_jsx("button", { type: "button", className: clsx('segmented__btn'), "aria-pressed": opt.id === value, onClick: () => onChange(opt.id), children: opt.label }, opt.id))) }));
}
