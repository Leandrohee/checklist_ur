import React from "react";
import { Check } from "lucide-react";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: React.ReactNode;
  disabled?: boolean;
}

export function Checkbox({ id, checked, onChange, label, disabled = false }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="relative flex items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
        />
        <div
          className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${
            checked
              ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
              : "border-slate-300 bg-white group-hover:border-slate-400 dark:border-zinc-600 dark:bg-zinc-800"
          }`}
        >
          {checked && <Check className="w-4 h-4 stroke-[3]" />}
        </div>
      </div>
      {label && <div className="flex-1">{label}</div>}
    </label>
  );
}
