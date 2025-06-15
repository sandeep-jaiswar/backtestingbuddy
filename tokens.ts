export const colors = {
  palette: {
    red: { light: "#ef4444", dark: "#f87171" },
    orange: { light: "#f97316", dark: "#fb923c" },
    yellow: { light: "#eab308", dark: "#facc15" },
    green: { light: "#22c55e", dark: "#4ade80" },
    teal: { light: "#14b8a6", dark: "#2dd4bf" },
    blue: { light: "#3b82f6", dark: "#60a5fa" },
    indigo: { light: "#6366f1", dark: "#818cf8" },
    purple: { light: "#8b5cf6", dark: "#a78bfa" },
    pink: { light: "#ec4899", dark: "#f472b6" },
    gray: {
      light: "#6b7280",
      dark: "#d1d5db",
      "100-light": "#e5e7eb",
      "200-light": "#d1d5db",
      "300-light": "#9ca3af",
      "400-light": "#6b7280",
      "500-light": "#4b5563",
      "100-dark": "#374151",
      "200-dark": "#4b5563",
      "300-dark": "#6b7280",
      "400-dark": "#9ca3af",
      "500-dark": "#d1d5db",
    },
    fill: {
      light: {
        solid: "#ffffff",
        transparent: "rgba(255, 255, 255, 0.6)",
      },
      dark: {
        solid: "#0f172a",
        transparent: "rgba(15, 23, 42, 0.6)",
      },
    },
  },
  background: {
    light: {
      base: "#ffffff",
      muted: "#f9fafb",
      subtle: "#f3f4f6",
      elevated: {
        base: "#ffffff",
        subtle: "#f3f4f6",
      },
    },
    dark: {
      base: "#0f172a",
      muted: "#1e293b",
      subtle: "#334155",
      elevated: {
        base: "#1e293b",
        subtle: "#334155",
      },
    },
  },
  text: {
    light: {
      primary: "#111827",
      secondary: "#374151",
      tertiary: "#6b7280",
      quaternary: "#9ca3af",
      accent: "#3b82f6",
      destructive: "#ef4444",
      on: {
        accent: "#ffffff",
        destructive: "#ffffff",
      },
    },
    dark: {
      primary: "#f8fafc",
      secondary: "#e2e8f0",
      tertiary: "#cbd5e1",
      quaternary: "#94a3b8",
      accent: "#60a5fa",
      destructive: "#f87171",
      on: {
        accent: "#ffffff",
        destructive: "#ffffff",
      },
    },
  },
  border: {
    light: {
      base: "#e5e7eb",
      subtle: "#d1d5db",
      focus: "#3b82f6",
      default: "#e5e7eb",
    },
    dark: {
      base: "#334155",
      subtle: "#475569",
      focus: "#60a5fa",
    },
  },
  action: {
    light: {
      primary: {
        bg: "#3b82f6",
        hover: "#2563eb",
        text: "#ffffff",
        border: "#3b82f6",
        tint: {
          bg: "#eff6ff",
          text: "#3b82f6",
        },
      },
      destructive: {
        bg: "#ef4444",
        hover: "#dc2626",
        text: "#ffffff",
        border: "#ef4444",
        tint: {
          bg: "#fef2f2",
          text: "#ef4444",
        },
      },
      neutral: {
        bg: "#e5e7eb",
        hover: "#d1d5db",
        text: "#111827",
        border: "#e5e7eb",
        tint: {
          bg: "#f3f4f6",
          text: "#374151",
        },
      },
    },
    dark: {
      primary: {
        bg: "#60a5fa",
        hover: "#3b82f6",
        text: "#ffffff",
        border: "#60a5fa",
        tint: {
          bg: "#1e3a8a",
          text: "#60a5fa",
        },
      },
      destructive: {
        bg: "#f87171",
        hover: "#b91c1c",
        text: "#ffffff",
        border: "#f87171",
        tint: {
          bg: "#7f1d1d",
          text: "#f87171",
        },
      },
      neutral: {
        bg: "#475569",
        hover: "#64748b",
        text: "#f1f5f9",
        border: "#475569",
        tint: {
          bg: "#334155",
          text: "#cbd5e1",
        },
      },
    },
  },
}

export const fontFamily = {
  sans: ["var(--font-family-sf-pro-text)", "sans-serif"],
  display: ["var(--font-family-sf-pro-display)", "sans-serif"],
  mono: ["var(--font-family-sf-mono)", "monospace"],
}

export const fontSize = {
  "4xs": "0.6875rem", // 11px
  "3xs": "0.75rem", // 12px
  "2xs": "0.8125rem", // 13px
  xs: "0.875rem",
  sm: "0.9375rem",
  base: "1rem",
  lg: "1.0625rem",
  xl: "1.125rem",
  "2xl": "1.25rem",
  "3xl": "1.375rem",
  "4xl": "1.5rem",
  "5xl": "1.75rem",
  "6xl": "2.125rem",
  "7xl": "2.5rem",
}

export const boxShadow = {
  frame:
    "0px 4px 40px rgba(238, 238, 238, 1), 0px 4px 8px rgba(66, 71, 76, 0.05), 0px 0px 0.5px rgba(66, 71, 76, 0.32)",
}
