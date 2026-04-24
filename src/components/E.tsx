'use client';
import { useContext, KeyboardEvent } from 'react';
import { EditContext } from '@/context/EditContext';

export default function E({ id, children }: { id: string; children: string }) {
  const { editMode, getText, setText } = useContext(EditContext);
  const text = getText(id) ?? children;

  if (!editMode) return <>{text}</>;

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const val = e.currentTarget.textContent?.trim();
        if (val) setText(id, val);
      }}
      onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
      style={{
        outline: '1px dashed rgba(0,255,136,0.55)',
        borderRadius: '3px',
        padding: '1px 3px',
        cursor: 'text',
        display: 'inline',
        minWidth: '4px',
        transition: 'outline-color 0.15s, background 0.15s',
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = '2px solid rgba(0,255,136,0.9)';
        e.currentTarget.style.background = 'rgba(0,255,136,0.06)';
      }}
      onBlurCapture={(e) => {
        e.currentTarget.style.outline = '1px dashed rgba(0,255,136,0.55)';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {text}
    </span>
  );
}
