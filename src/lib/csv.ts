/** Pārvērš objektu masīvu par CSV tekstu (ar UTF-8 BOM Excel atbalstam). */
export function toCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: { key: keyof T; header: string }[]
): string {
  const escape = (val: unknown): string => {
    if (val === null || val === undefined) return "";
    const s = String(val);
    if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const head = columns.map((c) => escape(c.header)).join(",");
  const body = rows
    .map((row) => columns.map((c) => escape(row[c.key])).join(","))
    .join("\n");

  return "﻿" + head + "\n" + body;
}

export function csvResponse(csv: string, filename: string): Response {
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
