import React from "react";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export function ProgressBar({ percentage, className = "" }: ProgressBarProps) {
  // Ajusta cor da barra de acordo com o progresso
  let colorClass = "bg-amber-500";
  if (percentage === 100) {
    colorClass = "bg-emerald-600";
  } else if (percentage >= 50) {
    colorClass = "bg-blue-600";
  }

  return (
    <div className={`w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-3 overflow-hidden ${className}`}>
      <div
        className={`h-full transition-all duration-300 ease-out rounded-full ${colorClass}`}
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
