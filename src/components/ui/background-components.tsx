"use client";
import { cn } from "@/lib/utils";

interface BackgroundProps {
  className?: string;
}

export const YellowGlowBackground = ({ className }: BackgroundProps) => {
  return (
    <div
      className={cn("absolute inset-0 w-full h-full", className)}
      style={{ background: "#06060e" }}
    >
      {/* Primary yellow core glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 249, 145, 0.09) 0%, transparent 70%)`,
        }}
      />
      {/* Secondary warm amber spread */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 50% 40% at 50% 20%, rgba(251, 191, 36, 0.05) 0%, transparent 65%)`,
        }}
      />
      {/* Noise grain texture for depth */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-yellow">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-yellow)" />
      </svg>
    </div>
  );
};

export const BlueGlowBackground = ({ className }: BackgroundProps) => {
  return (
    <div
      className={cn("absolute inset-0 w-full h-full", className)}
      style={{ background: "#05050f" }}
    >
      {/* Sky blue center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 55% at 50% 45%, rgba(147, 197, 253, 0.1) 0%, transparent 70%)`,
        }}
      />
      {/* Soft cobalt ring */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 45% 35% at 50% 15%, rgba(96, 165, 250, 0.06) 0%, transparent 65%)`,
        }}
      />
      {/* Noise grain texture for depth */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-blue">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-blue)" />
      </svg>
    </div>
  );
};

export default YellowGlowBackground;
