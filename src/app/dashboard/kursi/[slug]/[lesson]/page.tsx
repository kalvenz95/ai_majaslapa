"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { VideoPlayer } from "@/components/dashboard/VideoPlayer";
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

  return (
    <div>
      {/* Back */}
      <Link
        href={`/dashboard/kursi/${params.slug}`}
        className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        {course.title}
      </Link>

      {/* Video */}
      <div className="mb-6">
        {lesson.videoUrl ? (
          <VideoPlayer url={lesson.videoUrl} title={lesson.title} />
        ) : (
          <div
            className="flex flex-col items-center justify-center rounded-2xl py-16"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="text-4xl mb-3">🎬</div>
            <div className="text-sm font-semibold text-white mb-1">Video drīzumā</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Saturs tiek sagatavots
            </div>
          </div>
        )}
      </div>

      {/* Lesson info */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: course.color }}>
              Lekcija {currentIndex + 1}
            </div>
            <h1 className="text-2xl font-black text-white mb-2">{lesson.title}</h1>
            {lesson.description && (
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {lesson.description}
              </p>
            )}
          </div>

          {/* Complete button */}
          <button
            onClick={markComplete}
            disabled={completed || marking}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
            style={
              completed
                ? { background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}40` }
                : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", cursor: marking ? "wait" : "pointer" }
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
              <>
                {marking ? "Saglabā..." : "Atzīmēt kā pabeigtu"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div
        className="flex items-center justify-between pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {prevLesson ? (
          <Link
            href={`/dashboard/kursi/${params.slug}/${prevLesson.id}`}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Iepriekšējā
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/dashboard/kursi/${params.slug}/${nextLesson.id}`}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold transition-all"
            style={{
              background: `${course.color}15`,
              border: `1px solid ${course.color}30`,
              color: course.color,
              textDecoration: "none",
            }}
          >
            Nākamā lekcija
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <Link
            href={`/dashboard/kursi/${params.slug}`}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-bold"
            style={{
              background: course.color,
              color: "#000",
              textDecoration: "none",
            }}
          >
            🎉 Kurss pabeigts!
          </Link>
        )}
      </div>
    </div>
  );
}
