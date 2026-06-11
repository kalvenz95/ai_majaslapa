"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { VideoPlayer } from "@/components/dashboard/VideoPlayer";
import { EmojiIcon } from "@/components/EmojiIcon";
import { progressApi } from "@/lib/api";

interface Lesson {
  id: string;
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  duration?: number | null;
  order: number;
  isFree: boolean;
}

interface Course {
  id: string;
  slug: string;
  title: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export default function LessonPage({
  params,
}: {
  params: { slug: string; lesson: string };
}) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState(false);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${params.slug}`)
      .then((r) => r.json())
      .then(({ course }) => {
        if (!course) return;
        setCourse(course);
        const found = course.lessons.find((l: Lesson) => l.id === params.lesson);
        if (!found) {
          router.push(`/dashboard/kursi/${params.slug}`);
          return;
        }
        setLesson(found);
      });
  }, [params.slug, params.lesson, router]);

  async function markComplete() {
    if (!lesson) return;
    setMarking(true);
    try {
      await progressApi.complete(lesson.id);
      setCompleted(true);
    } catch {
      // Kļūda — lietotājs nav pieteicies vai nav piekļuves
    } finally {
      setMarking(false);
    }
  }

  const currentIndex = course?.lessons.findIndex((l) => l.id === params.lesson) ?? -1;
  const prevLesson = currentIndex > 0 ? course?.lessons[currentIndex - 1] : null;
  const nextLesson = course?.lessons[currentIndex + 1] ?? null;

  if (!course || !lesson) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          Ielādē lekciju...
        </div>
      </div>
    );
  }

  const totalLessons = course.lessons.length;
  const durationMin = lesson.duration ? Math.max(1, Math.floor(lesson.duration / 60)) : null;
  const accent = course.color;

  return (
    <div>
      {/* Breadcrumb */}
      <Link
        href={`/dashboard/kursi/${params.slug}`}
        className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-white"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        {course.title}
      </Link>

      {/* Video */}
      <div
        className="mb-6 rounded-2xl overflow-hidden"
        style={{ boxShadow: `0 24px 60px -28px ${accent}66`, border: `1px solid ${accent}22` }}
      >
        {lesson.videoUrl ? (
          <VideoPlayer url={lesson.videoUrl} title={lesson.title} />
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20"
            style={{
              background: `linear-gradient(140deg, ${accent}14 0%, rgba(255,255,255,0.02) 100%)`,
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
              style={{ background: `${accent}1f`, border: `1px solid ${accent}3a` }}
            >
              <EmojiIcon emoji="🎬" size={26} color={accent} strokeWidth={1.75} />
            </div>
            <div className="text-sm font-semibold text-white mb-1">Video drīzumā</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Saturs tiek sagatavots
            </div>
          </div>
        )}
      </div>

      {/* Lesson info card */}
      <div
        className="rounded-2xl p-6 md:p-7 mb-6"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Meta chips */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${accent}1a`, border: `1px solid ${accent}38`, color: accent }}
          >
            Lekcija {currentIndex + 1} / {totalLessons}
          </span>
          {durationMin && (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.6)" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {durationMin} min
            </span>
          )}
          {lesson.isFree && (
            <span
              className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.6)" }}
            >
              Bezmaksas
            </span>
          )}
        </div>

        {/* Title + description + complete */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-5">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-[28px] font-black text-white mb-2 leading-tight tracking-tight">
              {lesson.title}
            </h1>
            {lesson.description && (
              <p
                className="text-sm md:text-[15px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)", maxWidth: "62ch" }}
              >
                {lesson.description}
              </p>
            )}
          </div>

          {/* Complete button */}
          <button
            onClick={markComplete}
            disabled={completed || marking}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={
              completed
                ? { background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }
                : { background: accent, color: "#000", border: `1px solid ${accent}`, cursor: marking ? "wait" : "pointer" }
            }
          >
            {completed ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                Pabeigts
              </>
            ) : (
              <>{marking ? "Saglabā..." : "Atzīmēt kā pabeigtu"}</>
            )}
          </button>
        </div>
      </div>

      {/* Prev / Next navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prevLesson ? (
          <Link
            href={`/dashboard/kursi/${params.slug}/${prevLesson.id}`}
            className="flex items-center gap-3 p-4 rounded-xl transition-colors hover:bg-white/[0.05]"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}
          >
            <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <div className="min-w-0">
              <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Iepriekšējā</div>
              <div className="text-sm font-semibold text-white truncate">{prevLesson.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/dashboard/kursi/${params.slug}/${nextLesson.id}`}
            className="flex items-center justify-end gap-3 p-4 rounded-xl text-right transition-colors"
            style={{ background: `${accent}12`, border: `1px solid ${accent}2e`, textDecoration: "none" }}
          >
            <div className="min-w-0">
              <div className="text-xs mb-0.5" style={{ color: `${accent}cc` }}>Nākamā lekcija</div>
              <div className="text-sm font-semibold text-white truncate">{nextLesson.title}</div>
            </div>
            <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <Link
            href={`/dashboard/kursi/${params.slug}`}
            className="flex items-center justify-center gap-2 p-4 rounded-xl text-sm font-bold transition-transform hover:-translate-y-0.5"
            style={{ background: accent, color: "#000", textDecoration: "none" }}
          >
            🎉 Kurss pabeigts!
          </Link>
        )}
      </div>
    </div>
  );
}
