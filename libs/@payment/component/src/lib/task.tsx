import React from 'react';

export function Task({ id, title, state }: any) {
  return (
    <div className="list-item">
      <input type="text" value={title} readOnly={true} />
    </div>
  );
}
