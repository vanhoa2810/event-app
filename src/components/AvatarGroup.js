import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const colors = ['#b14bff', '#3182ce', '#f56565', '#ed8936', '#38a169'];
export default function AvatarGroup({ ids, maxVisible = 4 }) {
    if (!ids.length)
        return null;
    const visible = ids.slice(0, maxVisible);
    const extra = ids.length - visible.length;
    return (_jsxs("div", { className: "avatar-group", "aria-label": `${ids.length} going`, children: [visible.map((id, i) => (_jsx("div", { className: "avatar-group__item", style: { background: colors[i % colors.length] }, title: id, children: id.substring(0, 2).toUpperCase() }, id))), extra > 0 && (_jsxs("div", { className: "avatar-group__item", "aria-label": `${extra} more`, children: ["+", extra] }))] }));
}
