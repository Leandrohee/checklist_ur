import React from "react";
import {
  ShieldAlert,
  HeartPulse,
  Activity,
  Wind,
  Layers,
  Archive,
  FolderOpen,
  FolderLock,
  Box,
  CheckSquare,
} from "lucide-react";

/**
 * Retorna o ícone do Lucide correspondente ao nome configurado na categoria.
 */
export function getCategoryIcon(iconName?: string, className: string = "w-5 h-5"): React.ReactNode {
  switch (iconName) {
    case "ShieldAlert":
      return <ShieldAlert className={className} />;
    case "HeartPulse":
      return <HeartPulse className={className} />;
    case "Activity":
      return <Activity className={className} />;
    case "Wind":
      return <Wind className={className} />;
    case "Layers":
      return <Layers className={className} />;
    case "Archive":
      return <Archive className={className} />;
    case "FolderOpen":
      return <FolderOpen className={className} />;
    case "FolderLock":
      return <FolderLock className={className} />;
    case "Box":
      return <Box className={className} />;
    default:
      return <CheckSquare className={className} />;
  }
}
