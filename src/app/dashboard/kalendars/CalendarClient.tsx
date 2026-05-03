"use client";
import { useState } from "react";

type EventType = "WEBINAR" | "QA" | "WORKSHOP" | "OTHER";

type LiveEvent = {
  id: string;
  title: string;
  description: string | null;
  startAt: Date | string;
  endAt: Date | string | null;
  meetUrl: string | null;
  type: EventType;
};

const EVENT_CONFIG: Record<EventType, { label: string; color: string; icon: string }> = {
  WEBINAR:  { label: "Webinārs",  color: "#00d4ff", icon: "📡" },
  QA:       { label: "Q&A",       color: "#a855f7", icon: "🎙️" },
  WORKSHOP: { label: "Darbnīca",  color: "#00ff88", icon: "🛠️" },
  OTHER:    { label: "Pasākums",  color: "#f59e0b", icon: "📅" },
};

const LV_MONTHS = ["Janvāris","Februāris","Marts","Aprīlis","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"];
const LV_DAYS_SHORT = ["Sv","Pr","Ot","Tr","Ce","Pk","Se"];
const LV_MONTHS_SHORT = ["Jan","Feb","Mar","Apr","Mai","Jūn","Jūl","Aug","Sep","Okt","Nov","Dec"];

function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString("lv-LV", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(date: Date | string) {
  const d = new Date(date);
  return `${d.getDate()}. ${LV_MONTHS_SHORT[d.getMonth()]}`;
}

function isSameDay(a: Date | string, b: Date) {
  const da = new Date(a);
  return da.getFullYear() === b.getFullYear() && da.getMonth() === b.getMonth() && da.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday-first
}

export default function CalendarClient({ events }: { events: LiveEvent[] }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const daysInMonth = getDaysInMonth(viewMonth.year, viewMonth.month);
  const firstDay = getFirstDayOfMonth(viewMonth.year, viewMonth.month);

  function prevMonth() {
    setViewMonth((v) => {
      if (v.month === 0) return { year: v.year - 1, month: 11 };
      return { ...v, month: v.month - 1 };
    });
    setSelectedDay(null);
  }

  function nextMonth() {
    setViewMonth((v) => {
      if (v.month === 11) return { year: v.year + 1, month: 0 };
      return { ...v, month: v.month + 1 };
    });
    setSelectedDay(null);
  }

  function eventsOnDay(day: number) {
    const date = new Date(viewMonth.year, viewMonth.month, day);
    return events.filter((e) => isSameDay(e.startAt, date));
  }

  const selectedEvents = selectedDay ? events.filter((e) => isSameDay(e.startAt, selectedDay)) : [];

  // Nākamie pasākumi (no šodienas)
  const upcomingEvents = events.filter((e) => new Date(e.startAt) >= today);

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Kalendārs</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Live pasākumi, webināri un darbnīcas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Kalendārs */}
        <div
          className="lg:col-span-3 rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Mēnesis navigācija */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="text-sm font-black text-white">
              {LV_MONTHS[viewMonth.month]} {viewMonth.year}
            </span>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dienu galvene */}
          <div className="grid grid-cols-7 mb-2">
            {LV_DAYS_SHORT.map((d) => (
              <div key={d} className="text-center text-xs font-bold py-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Dienas */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(viewMonth.year, viewMonth.month, day);
              const isToday = isSameDay(today, date);
              const isSelected = selectedDay ? isSameDay(selectedDay, date) : false;
              const dayEvents = eventsOnDay(day);
              const hasEvent = dayEvents.length > 0;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(isSelected ? null : date)}
                  className="relative aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all duration-150"
                  style={{
                    background: isSelected
                      ? "rgba(0,212,255,0.2)"
                      : isToday
                      ? "rgba(0,255,136,0.1)"
                      : "transparent",
                    color: isSelected
                      ? "#00d4ff"
                      : isToday
                      ? "#00ff88"
                      : "rgba(255,255,255,0.7)",
                    border: isSelected
                      ? "1px solid rgba(0,212,255,0.4)"
                      : isToday
                      ? "1px solid rgba(0,255,136,0.3)"
                      : "1px solid transparent",
                  }}
                >
                  {day}
                  {hasEvent && (
                    <div className="flex gap-0.5 mt-0.5">
                      {dayEvents.slice(0, 3).map((e) => (
                        <div
                          key={e.id}
                          className="w-1 h-1 rounded-full"
                          style={{ background: EVENT_CONFIG[e.type].color }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Leģenda */}
          <div className="flex flex-wrap gap-3 mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {Object.entries(EVENT_CONFIG).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Labā puse: atlasītā diena vai nākamie pasākumi */}
        <div className="lg:col-span-2 space-y-3">
          {selectedDay ? (
            <>
              <div className="text-sm font-black text-white mb-1">
                {selectedDay.getDate()}. {LV_MONTHS[selectedDay.getMonth()]}
              </div>
              {selectedEvents.length === 0 ? (
                <div
                  className="rounded-xl p-4 text-center text-sm"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }}
                >
                  Šajā dienā nav pasākumu
                </div>
              ) : (
                selectedEvents.map((event) => <EventCard key={event.id} event={event} />)
              )}
            </>
          ) : (
            <>
              <div className="text-sm font-black text-white mb-1">Gaidāmie pasākumi</div>
              {upcomingEvents.length === 0 ? (
                <div
                  className="rounded-xl p-4 text-center text-sm"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }}
                >
                  <div className="text-2xl mb-2">📭</div>
                  Pagaidām nav plānotu pasākumu
                </div>
              ) : (
                upcomingEvents.slice(0, 5).map((event) => <EventCard key={event.id} event={event} />)
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: LiveEvent }) {
  const cfg = EVENT_CONFIG[event.type];
  const isLive = new Date(event.startAt) <= new Date() && (!event.endAt || new Date(event.endAt) >= new Date());

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: `${cfg.color}08`,
        border: `1px solid ${cfg.color}25`,
      }}
    >
      <div className="flex items-start gap-2.5">
        <span className="text-lg shrink-0">{cfg.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${cfg.color}20`, color: cfg.color }}
            >
              {cfg.label}
            </span>
            {isLive && (
              <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "#f87171" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
                LIVE
              </span>
            )}
          </div>
          <div className="text-sm font-black text-white truncate">{event.title}</div>
          {event.description && (
            <div className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              {event.description.length > 80 ? event.description.slice(0, 80) + "..." : event.description}
            </div>
          )}
          <div className="flex items-center gap-2 mt-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(255,255,255,0.35)" }}>
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              {formatDate(event.startAt)}, {formatTime(event.startAt)}
              {event.endAt && ` — ${formatTime(event.endAt)}`}
            </span>
          </div>
          {event.meetUrl && (
            <a
              href={event.meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
              style={{ background: cfg.color, color: "#000" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Pievienoties
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
