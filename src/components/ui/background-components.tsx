"use client";
import { cn } from "@/lib/utils";

interface BackgroundProps {
  className?: string;
}

export const YellowGlowBackground = ({ className }: BackgroundProps) => {
  return (
    <div
      className={cn("absolute inset-0 w-full h-full overflow-hidden", className)}
      style={{ background: "#06060e" }}
    >
      {/* Top teal gradient */}
      <div
        className="absolute transform-gpu overflow-hidden blur-3xl pointer-events-none"
        style={{ inset: "0 0 auto 0", top: "-10rem" }}
      >
        <div
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            background: "linear-gradient(to top right, oklch(0.75 0.18 150), oklch(0.55 0.20 200))",
            position: "relative",
            left: "calc(50% - 30rem)",
            width: "72rem",
            aspectRatio: "1155/678",
            transform: "rotate(30deg) translateX(-50%)",
            opacity: 0.3,
          }}
        />
      </div>
      {/* Bottom teal gradient */}
      <div
        className="absolute transform-gpu overflow-hidden blur-3xl pointer-events-none"
        style={{ inset: "auto 0 0 0", bottom: "-10rem" }}
      >
        <div
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            background: "linear-gradient(to top right, oklch(0.75 0.18 150), oklch(0.55 0.20 200))",
            position: "relative",
            left: "calc(50% + 36rem)",
            width: "72rem",
            aspectRatio: "1155/678",
            transform: "translateX(-50%)",
            opacity: 0.25,
          }}
        />
      </div>
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
