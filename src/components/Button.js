import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
export default function Button({ variant = 'secondary', children, className, ...rest }) {
    return (_jsx("button", { className: clsx('btn', variant === 'primary' && 'btn--primary', className), ...rest, children: children }));
}
