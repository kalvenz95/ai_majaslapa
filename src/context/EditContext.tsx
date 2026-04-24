'use client';
import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface EditContextType {
  editMode: boolean;
  toggleEdit: () => void;
  getText: (id: string) => string | null;
  setText: (id: string, value: string) => void;
  resetAll: () => void;
}

export const EditContext = createContext<EditContextType>({
  editMode: false,
  toggleEdit: () => {},
  getText: () => null,
  setText: () => {},
  resetAll: () => {},
});

const STORAGE_KEY = 'chademy_edits_v1';

export function EditProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setOverrides(JSON.parse(saved));
    } catch {}
  }, []);

  const setText = useCallback((id: string, value: string) => {
    setOverrides(prev => {
      const next = { ...prev, [id]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getText = useCallback((id: string) => overrides[id] ?? null, [overrides]);

  const resetAll = useCallback(() => {
    setOverrides({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <EditContext.Provider value={{ editMode, toggleEdit: () => setEditMode(v => !v), getText, setText, resetAll }}>
      {children}
    </EditContext.Provider>
  );
}
