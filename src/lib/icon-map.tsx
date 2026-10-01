import React from 'react';
import {
  BarChart3,
  Bot,
  Boxes,
  Building2,
  CalendarClock,
  Cloud,
  Code2,
  GraduationCap,
  HeartPulse,
  Layers,
  LayoutGrid,
  RefreshCw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
  UtensilsCrossed,
  Workflow,
} from 'lucide-react';

export type IconComponent = React.ComponentType<{ className?: string }>;

/**
 * `iconName` strings in `src/content/data.ts` → lucide components.
 *
 * Kept in one module because the same names are resolved from several places
 * (the services view, the solutions view, and the detail routes). Three copies
 * of the map drifted apart before, so a name that resolved on the listing page
 * silently fell back to a generic glyph on the detail page.
 */
export const ICON_MAP: Record<string, IconComponent> = {
  BarChart3,
  Bot,
  Boxes,
  Building2,
  CalendarClock,
  Cloud,
  // Historical alias kept because the content still uses it in places.
  CloudCheck: Cloud,
  Code2,
  GraduationCap,
  HeartPulse,
  Layers,
  LayoutGrid,
  RefreshCw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
  UtensilsCrossed,
  Workflow,
};

/** Resolves an icon name, falling back to a neutral glyph rather than crashing. */
export function resolveIcon(name: string | undefined): IconComponent {
  return (name && ICON_MAP[name]) || Layers;
}
