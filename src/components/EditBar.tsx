'use client';
import { useContext } from 'react';
import { EditContext } from '@/context/EditContext';

export default function EditBar() {
  const { editMode, toggleEdit, resetAll } = useContext(EditContext);

  return (
    <>
      {editMode && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9998,
            background: 'rgba(0,255,136,0.08)',
            borderBottom: '1px solid rgba(0,255,136,0.2)',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '13px',
          }}
        >
          <span style={{ color: '#00ff88', fontWeight: 600 }}>✏️ Rediģēšanas režīms</span>
          <span style={{ color: '#6b7280' }}>— noklikšķini uz teksta lai labotu, izmaiņas saglabājas automātiski</span>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {editMode && (
          <button
            onClick={resetAll}
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1px solid rgba(239,68,68,0.35)',
              color: '#f87171',
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Atiestatīt
          </button>
        )}
        <button
          onClick={toggleEdit}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            border: editMode ? 'none' : '1px solid rgba(255,255,255,0.15)',
            background: editMode ? '#00ff88' : 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            color: editMode ? '#000' : '#d1d5db',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: editMode ? '0 0 20px rgba(0,255,136,0.3)' : '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          {editMode ? '✓ Pabeigt rediģēšanu' : '✏️ Rediģēt lapu'}
        </button>
      </div>
    </>
  );
}
