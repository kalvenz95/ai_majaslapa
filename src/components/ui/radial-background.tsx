import { cn } from "@/lib/utils";

export const RadialBackground = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("fixed inset-0 -z-10", className)}
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6633ee 100%)",
      }}
    />
  );
};
