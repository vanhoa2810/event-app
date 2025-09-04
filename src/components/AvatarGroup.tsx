import React from 'react';

interface Props {
  ids: string[];
  maxVisible?: number;
}

const colors = ['#b14bff','#3182ce','#f56565','#ed8936','#38a169'];

export default function AvatarGroup({ ids, maxVisible = 4 }: Props) {
  if (!ids.length) return null;
  const visible = ids.slice(0, maxVisible);
  const extra = ids.length - visible.length;

  return (
    <div className="avatar-group" aria-label={`${ids.length} going`}>
      {visible.map((id, i) => (
        <div
          key={id}
          className="avatar-group__item"
          style={{ background: colors[i % colors.length] }}
          title={id}
        >
          {id.substring(0,2).toUpperCase()}
        </div>
      ))}
      {extra > 0 && (
        <div className="avatar-group__item" aria-label={`${extra} more`}>
          +{extra}
        </div>
      )}
    </div>
  );
}