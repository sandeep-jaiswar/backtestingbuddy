const COLORS = {
  // System Colors - Light
  systemRedLight: '#ef4444',
  systemOrangeLight: '#f97316',
  systemYellowLight: '#eab308',
  systemGreenLight: '#22c55e',
  systemTealLight: '#14b8a6',
  systemBlueLight: '#3b82f6',
  systemIndigoLight: '#6366f1',
  systemPurpleLight: '#8b5cf6',
  systemPinkLight: '#ec4899',
  systemGrayLight: '#6b7280',
  gray02Light: '#e5e7eb',
  gray03Light: '#d1d5db',
  gray04Light: '#9ca3af',
  gray05Light: '#6b7280',
  gray06Light: '#4b5563',

  // System Colors - Dark
  systemRedDark: '#f87171',
  systemOrangeDark: '#fb923c',
  systemYellowDark: '#facc15',
  systemGreenDark: '#4ade80',
  systemTealDark: '#2dd4bf',
  systemBlueDark: '#60a5fa',
  systemIndigoDark: '#818cf8',
  systemPurpleDark: '#a78bfa',
  systemPinkDark: '#f472b6',
  systemGrayDark: '#d1d5db',
  gray02Dark: '#374151',
  gray03Dark: '#4b5563',
  gray04Dark: '#6b7280',
  gray05Dark: '#9ca3af',
  gray06Dark: '#d1d5db',

  // UI Semantic Colors - Light
  uiBackgroundPrimaryLight: '#ffffff',
  uiBackgroundSecondaryLight: '#f9fafb',
  uiBackgroundTertiaryLight: '#f3f4f6',
  uiBackgroundElevatedPrimaryLight: '#ffffff',
  uiBackgroundElevatedSecondaryLight: '#f3f4f6',

  uiTextPrimaryLight: '#111827',
  uiTextSecondaryLight: '#374151',
  uiTextTertiaryLight: '#6b7280',
  uiTextQuaternaryLight: '#9ca3af',
  uiTextAccentLight: '#3b82f6',
  uiTextDestructiveLight: '#ef4444',
  uiTextOnAccentLight: '#ffffff',
  uiTextOnDestructiveLight: '#ffffff',

  uiBorderPrimaryLight: '#e5e7eb',
  uiBorderSecondaryLight: '#d1d5db',
  uiBorderFocusLight: '#3b82f6',
  defaultBorderColorLight: '#e5e7eb',

  uiActionPrimaryBgLight: '#3b82f6',
  uiActionPrimaryBgHoverLight: '#2563eb',
  uiActionPrimaryTextLight: '#ffffff',
  uiActionPrimaryBorderLight: '#3b82f6',
  uiActionPrimaryTintBgLight: '#eff6ff',
  uiActionPrimaryTintTextLight: '#3b82f6',

  uiActionDestructiveBgLight: '#ef4444',
  uiActionDestructiveBgHoverLight: '#dc2626',
  uiActionDestructiveTextLight: '#ffffff',
  uiActionDestructiveBorderLight: '#ef4444',
  uiActionDestructiveTintBgLight: '#fef2f2',
  uiActionDestructiveTintTextLight: '#ef4444',

  uiActionNeutralBgLight: '#e5e7eb',
  uiActionNeutralBgHoverLight: '#d1d5db',
  uiActionNeutralTextLight: '#111827',
  uiActionNeutralBorderLight: '#e5e7eb',
  uiActionNeutralTintBgLight: '#f3f4f6',
  uiActionNeutralTintTextLight: '#374151',

  colorFillLightNoTransparency: '#ffffff',
  colorFillLightWithTransparency: 'rgba(255, 255, 255, 0.6)',

  // UI Semantic Colors - Dark
  uiBackgroundPrimaryDark: '#0f172a',
  uiBackgroundSecondaryDark: '#1e293b',
  uiBackgroundTertiaryDark: '#334155',
  uiBackgroundElevatedPrimaryDark: '#1e293b',
  uiBackgroundElevatedSecondaryDark: '#334155',

  uiTextPrimaryDark: '#f8fafc',
  uiTextSecondaryDark: '#e2e8f0',
  uiTextTertiaryDark: '#cbd5e1',
  uiTextQuaternaryDark: '#94a3b8',
  uiTextAccentDark: '#60a5fa',
  uiTextDestructiveDark: '#f87171',
  uiTextOnAccentDark: '#ffffff',
  uiTextOnDestructiveDark: '#ffffff',

  uiBorderPrimaryDark: '#334155',
  uiBorderSecondaryDark: '#475569',
  uiBorderFocusDark: '#60a5fa',

  uiActionPrimaryBgDark: '#60a5fa',
  uiActionPrimaryBgHoverDark: '#3b82f6',
  uiActionPrimaryTextDark: '#ffffff',
  uiActionPrimaryBorderDark: '#60a5fa',
  uiActionPrimaryTintBgDark: '#1e3a8a',
  uiActionPrimaryTintTextDark: '#60a5fa',

  uiActionDestructiveBgDark: '#f87171',
  uiActionDestructiveBgHoverDark: '#b91c1c',
  uiActionDestructiveTextDark: '#ffffff',
  uiActionDestructiveBorderDark: '#f87171',
  uiActionDestructiveTintBgDark: '#7f1d1d',
  uiActionDestructiveTintTextDark: '#f87171',

  uiActionNeutralBgDark: '#475569',
  uiActionNeutralBgHoverDark: '#64748b',
  uiActionNeutralTextDark: '#f1f5f9',
  uiActionNeutralBorderDark: '#475569',
  uiActionNeutralTintBgDark: '#334155',
  uiActionNeutralTintTextDark: '#cbd5e1',

  colorFillDarkNoTransparency: '#0f172a',
  colorFillDarkWithTransparency: 'rgba(15, 23, 42, 0.6)',
};

export const colors = {
  system: {
    red: {
      light: COLORS.systemRedLight,
      dark: COLORS.systemRedDark,
    },
    orange: {
      light: COLORS.systemOrangeLight,
      dark: COLORS.systemOrangeDark,
    },
    yellow: {
      light: COLORS.systemYellowLight,
      dark: COLORS.systemYellowDark,
    },
    green: {
      light: COLORS.systemGreenLight,
      dark: COLORS.systemGreenDark,
    },
    teal: {
      light: COLORS.systemTealLight,
      dark: COLORS.systemTealDark,
    },
    blue: {
      light: COLORS.systemBlueLight,
      dark: COLORS.systemBlueDark,
    },
    indigo: {
      light: COLORS.systemIndigoLight,
      dark: COLORS.systemIndigoDark,
    },
    purple: {
      light: COLORS.systemPurpleLight,
      dark: COLORS.systemPurpleDark,
    },
    pink: {
      light: COLORS.systemPinkLight,
      dark: COLORS.systemPinkDark,
    },
    gray: {
      light: COLORS.systemGrayLight,
      dark: COLORS.systemGrayDark,
      '02-light': COLORS.gray02Light,
      '02-dark': COLORS.gray02Dark,
      '03-light': COLORS.gray03Light,
      '03-dark': COLORS.gray03Dark,
      '04-light': COLORS.gray04Light,
      '04-dark': COLORS.gray04Dark,
      '05-light': COLORS.gray05Light,
      '05-dark': COLORS.gray05Dark,
      '06-light': COLORS.gray06Light,
      '06-dark': COLORS.gray06Dark,
    },
    fill: {
      light: {
        solid: COLORS.colorFillLightNoTransparency,
        transparent: COLORS.colorFillLightWithTransparency,
      },
      dark: {
        solid: COLORS.colorFillDarkNoTransparency,
        transparent: COLORS.colorFillDarkWithTransparency,
      },
    },
  },
  ui: {
    background: {
      primary: COLORS.uiBackgroundPrimaryLight,
      secondary: COLORS.uiBackgroundSecondaryLight,
      tertiary: COLORS.uiBackgroundTertiaryLight,
      elevated: {
        primary: COLORS.uiBackgroundElevatedPrimaryLight,
        secondary: COLORS.uiBackgroundElevatedSecondaryLight,
      },
    },
    text: {
      primary: COLORS.uiTextPrimaryLight,
      secondary: COLORS.uiTextSecondaryLight,
      tertiary: COLORS.uiTextTertiaryLight,
      quaternary: COLORS.uiTextQuaternaryLight,
      accent: COLORS.uiTextAccentLight,
      destructive: COLORS.uiTextDestructiveLight,
      on: {
        accent: COLORS.uiTextOnAccentLight,
        destructive: COLORS.uiTextOnDestructiveLight,
      },
    },
    border: {
      primary: COLORS.uiBorderPrimaryLight,
      secondary: COLORS.uiBorderSecondaryLight,
      focus: COLORS.uiBorderFocusLight,
      default: COLORS.defaultBorderColorLight,
    },
    action: {
      primary: {
        bg: COLORS.uiActionPrimaryBgLight,
        hover: COLORS.uiActionPrimaryBgHoverLight,
        text: COLORS.uiActionPrimaryTextLight,
        border: COLORS.uiActionPrimaryBorderLight,
        tint: {
          bg: COLORS.uiActionPrimaryTintBgLight,
          text: COLORS.uiActionPrimaryTintTextLight,
        },
      },
      destructive: {
        bg: COLORS.uiActionDestructiveBgLight,
        hover: COLORS.uiActionDestructiveBgHoverLight,
        text: COLORS.uiActionDestructiveTextLight,
        border: COLORS.uiActionDestructiveBorderLight,
        tint: {
          bg: COLORS.uiActionDestructiveTintBgLight,
          text: COLORS.uiActionDestructiveTintTextLight,
        },
      },
      neutral: {
        bg: COLORS.uiActionNeutralBgLight,
        hover: COLORS.uiActionNeutralBgHoverLight,
        text: COLORS.uiActionNeutralTextLight,
        border: COLORS.uiActionNeutralBorderLight,
        tint: {
          bg: COLORS.uiActionNeutralTintBgLight,
          text: COLORS.uiActionNeutralTintTextLight,
        },
      },
    },
  },
};

export const darkColors = {
  ui: {
    background: {
      primary: COLORS.uiBackgroundPrimaryDark,
      secondary: COLORS.uiBackgroundSecondaryDark,
      tertiary: COLORS.uiBackgroundTertiaryDark,
      elevated: {
        primary: COLORS.uiBackgroundElevatedPrimaryDark,
        secondary: COLORS.uiBackgroundElevatedSecondaryDark,
      },
    },
    text: {
      primary: COLORS.uiTextPrimaryDark,
      secondary: COLORS.uiTextSecondaryDark,
      tertiary: COLORS.uiTextTertiaryDark,
      quaternary: COLORS.uiTextQuaternaryDark,
      accent: COLORS.uiTextAccentDark,
      destructive: COLORS.uiTextDestructiveDark,
      on: {
        accent: COLORS.uiTextOnAccentDark,
        destructive: COLORS.uiTextOnDestructiveDark,
      },
    },
    border: {
      primary: COLORS.uiBorderPrimaryDark,
      secondary: COLORS.uiBorderSecondaryDark,
      focus: COLORS.uiBorderFocusDark,
    },
    action: {
      primary: {
        bg: COLORS.uiActionPrimaryBgDark,
        hover: COLORS.uiActionPrimaryBgHoverDark,
        text: COLORS.uiActionPrimaryTextDark,
        border: COLORS.uiActionPrimaryBorderDark,
        tint: {
          bg: COLORS.uiActionPrimaryTintBgDark,
          text: COLORS.uiActionPrimaryTintTextDark,
        },
      },
      destructive: {
        bg: COLORS.uiActionDestructiveBgDark,
        hover: COLORS.uiActionDestructiveBgHoverDark,
        text: COLORS.uiActionDestructiveTextDark,
        border: COLORS.uiActionDestructiveBorderDark,
        tint: {
          bg: COLORS.uiActionDestructiveTintBgDark,
          text: COLORS.uiActionDestructiveTintTextDark,
        },
      },
      neutral: {
        bg: COLORS.uiActionNeutralBgDark,
        hover: COLORS.uiActionNeutralBgHoverDark,
        text: COLORS.uiActionNeutralTextDark,
        border: COLORS.uiActionNeutralBorderDark,
        tint: {
          bg: COLORS.uiActionNeutralTintBgDark,
          text: COLORS.uiActionNeutralTintTextDark,
        },
      },
    },
  },
   system: {
      fill: {
      light: {
        solid: COLORS.colorFillLightNoTransparency,
        transparent: COLORS.colorFillLightWithTransparency,
      },
      dark: {
        solid: COLORS.colorFillDarkNoTransparency,
        transparent: COLORS.colorFillDarkWithTransparency,
      },
    },
   },
};

export const fontFamily = {
  sans: ['var(--font-family-sf-pro-text)', 'sans-serif'],
  display: ['var(--font-family-sf-pro-display)', 'sans-serif'],
  mono: ['var(--font-family-sf-mono)', 'monospace'],
};

export const fontSize = {
  '4xs': '0.6875rem', // 11px
  '3xs': '0.75rem', // 12px
  '2xs': '0.8125rem', // 13px
  xs: '0.875rem', // 14px
  sm: '0.9375rem', // 15px
  base: '1rem', // 16px
  lg: '1.0625rem', // 17px
  xl: '1.125rem', // 18px
  '2xl': '1.25rem', // 20px
  '3xl': '1.375rem', // 22px
  '4xl': '1.5rem', // 24px
  '5xl': '1.75rem', // 28px
  '6xl': '2.125rem', // 34px
  '7xl': '2.5rem', // 40px
};

export const boxShadow = {
  'helper-frame':
    '0px 4px 40px rgba(238, 238, 238, 1), 0px 4px 8px rgba(66, 71, 76, 0.05), 0px 0px 0.5px rgba(66, 71, 76, 0.32)',
};
