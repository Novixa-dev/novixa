# Novixa — Design System & Engineering Token Reference

> Theme: **Precision Engineering (هندسة الدقة)**  
> Primary Goal: Deliver an unmistakable, human-engineered brand experience that completely avoids generic AI-slop tropes (excessive glowing cards, artificial skeleton delays, generic purple gradients, meaningless badges).

---

## 1. Core Color Palette & Tokens

### Primary Palette
- **Obsidian Background (الخلفية العميقة):** `#020617` (`slate-950`) — Solid, deep foundation with low ambient glare.
- **Surface Elevation (البطاقات والأسطح):** `#0B1120` & `rgba(15, 23, 42, 0.85)` (`slate-900/90`) with backdrop blur `16px`.
- **Primary Brand Blue (أزرق نوڤيكسا):** `#2563EB` (Tailwind `blue-600`) — Bold, trustworthy, technically authoritative.
- **Brand Blue Hover/Active:** `#3B82F6` (Hover `blue-500`) / `#1D4ED8` (Active `blue-700`).

### Accent & Status Palette
- **Teal / Product Accent (أخضر تيل/المنتجات):** `#14B8A6` (Tailwind `teal-500`) — Applied for product badges and growth metrics.
- **Indigo / SaaS Accent (نيلي/الأنظمة):** `#6366F1` (Tailwind `indigo-500`).
- **Emerald / Live Operational Status (أخضر تشغيلي):** `#10B981` (Tailwind `emerald-500`).
- **Amber / Operational Warning (تنبيه تشغيلي):** `#F59E0B` (Tailwind `amber-500`).
- **Rose / Friction Indicator (نقاط الاحتكاك):** `#F43F5E` (Tailwind `rose-500`).

### Typography & Fonts
- **Headings / Display (عناوين العرض):** `Alexandria` (Weights: 500, 600, 700, 800) — Sharp, geometric, architectural clarity in Arabic and Latin.
- **Arabic Body (النص العربي):** `IBM Plex Sans Arabic` (Weights: 300, 400, 500, 600, 700) — Highly readable technical grotesque font.
- **English Body (النص اللاتيني):** `Inter` (Weights: 400, 500, 600, 700) — Industry standard clean grotesque.
- **Monospace / System Tags (البيانات التقنية):** JetBrains Mono / System Monospace for status codes, timestamps, and architectural IDs.

---

## 2. Structural & Layout Principles

### Grids & Borders
- **Border Treatment:** High-contrast crisp 1px borders using `rgba(255, 255, 255, 0.08)` or `slate-800` rather than heavy fuzzy box-shadows.
- **Card Styling (`glass-card`):** Restrained slate background with minimal translucency, eliminating noisy decorative blobs.
- **Subtle Technical Background Pattern (`bg-grid-line-pattern`):** Crisp 48px hairline grid reflecting blueprint precision.

### Anti-AI Template Guidelines
1. **No Artificial Delays:** Avoid fake perceived-loading timers on static content. Content must render immediately.
2. **Asymmetrical Layout Hierarchy:** Use varied 2-column, 4-step horizontal trajectory, and deep-dive technical panels instead of repetitive 3-card boxes.
3. **Intentional Data Presentation:** Replace arbitrary percentage counters with verified architectural capabilities and concrete domain mechanics.
4. **Command Palette Integration (Cmd+K / Ctrl+K):** Enterprise-grade keyboard navigation across all products, solutions, industries, and articles.

---

## 3. Directional & Localization Rules (RTL / LTR)

- **Arabic (`dir="rtl"`):** Primary locale, right-aligned typography, contextual directional chevron flipping, and natural phrasing.
- **English (`dir="ltr"`):** Parity in structure, left-aligned typography, standard punctuation flow.
- **Logical Properties:** Use `rtl:text-right ltr:text-left`, `rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5` across all interactive elements.
