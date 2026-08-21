import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Inline form feedback.
 *
 * The originals styled errors and successes almost identically — both a
 * white-bordered translucent box — so a failure and a confirmation looked the
 * same at a glance. Errors now carry a distinct left rule.
 */
export function FormAlert({
  tone = "error",
  children,
  className,
}: {
  tone?: "error" | "success";
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = tone === "error" ? AlertCircle : CheckCircle2;

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4",
        tone === "error" && "border-l-2 border-l-white/60",
        className
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0 text-white/70" />
      <span className="text-xs leading-relaxed text-white/60 text-pretty">
        {children}
      </span>
    </div>
  );
}
