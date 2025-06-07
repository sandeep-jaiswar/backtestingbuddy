import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
      colors: {
        system: {
          red: {
            light: 'var(--color-system-red-light)',
            dark: 'var(--color-system-red-dark)',
          },
          orange: {
            light: 'var(--color-system-orange-light)',
            dark: 'var(--color-system-orange-dark)',
          },
          yellow: {
            light: 'var(--color-system-yellow-light)',
            dark: 'var(--color-system-yellow-dark)',
          },
          green: {
            light: 'var(--color-system-green-light)',
            dark: 'var(--color-system-green-dark)',
          },
          teal: {
            light: 'var(--color-system-teal-light)',
            dark: 'var(--color-system-teal-dark)',
          },
          blue: {
            light: 'var(--color-system-blue-light)',
            dark: 'var(--color-system-blue-dark)',
          },
          indigo: {
            light: 'var(--color-system-indigo-light)',
            dark: 'var(--color-system-indigo-dark)',
          },
          purple: {
            light: 'var(--color-system-purple-light)',
            dark: 'var(--color-system-purple-dark)',
          },
          pink: {
            light: 'var(--color-system-pink-light)',
            dark: 'var(--color-system-pink-dark)',
          },
          gray: {
            light: 'var(--color-system-gray-light)',
            dark: 'var(--color-system-gray-dark)',
            '02-light': 'var(--color-gray-02-light)',
            '02-dark': 'var(--color-gray-02-dark)',
            '03-light': 'var(--color-gray-03-light)',
            '03-dark': 'var(--color-gray-03-dark)',
            '04-light': 'var(--color-gray-04-light)',
            '04-dark': 'var(--color-gray-04-dark)',
            '05-light': 'var(--color-gray-05-light)',
            '05-dark': 'var(--color-gray-05-dark)',
            '06-light': 'var(--color-gray-06-light)',
            '06-dark': 'var(--color-gray-06-dark)',
          },
          fill: {
            light: {
              solid: 'var(--color-fill-light-no-transparency)',
              transparent: 'var(--color-fill-light-with-transparency)',
            },
            dark: {
              solid: 'var(--color-fill-dark-no-transparency)',
              transparent: 'var(--color-fill-dark-with-transparency)',
            },
          },
        },

        ui: {
          background: {
            primary: 'var(--ui-background-primary)',
            secondary: 'var(--ui-background-secondary)',
            tertiary: 'var(--ui-background-tertiary)',
            elevated: {
              primary: 'var(--ui-background-elevated-primary)',
              secondary: 'var(--ui-background-elevated-secondary)',
            },
          },
          text: {
            primary: 'var(--ui-text-primary)',
            secondary: 'var(--ui-text-secondary)',
            tertiary: 'var(--ui-text-tertiary)',
            quaternary: 'var(--ui-text-quaternary)',
            accent: 'var(--ui-text-accent)',
            destructive: 'var(--ui-text-destructive)',
            on: {
              accent: 'var(--ui-text-on-accent)',
              destructive: 'var(--ui-text-on-destructive)',
            },
          },
          border: {
            primary: 'var(--ui-border-primary)',
            secondary: 'var(--ui-border-secondary)',
            focus: 'var(--ui-border-focus)',
            default: 'var(--default-border-color)',
          },
          action: {
            primary: {
              bg: 'var(--ui-action-primary-bg)',
              hover: 'var(--ui-action-primary-bg-hover)',
              text: 'var(--ui-action-primary-text)',
              border: 'var(--ui-action-primary-border)',
              tint: {
                bg: 'var(--ui-action-primary-tint-bg)',
                text: 'var(--ui-action-primary-tint-text)',
              },
            },
            destructive: {
              bg: 'var(--ui-action-destructive-bg)',
              hover: 'var(--ui-action-destructive-bg-hover)',
              text: 'var(--ui-action-destructive-text)',
              border: 'var(--ui-action-destructive-border)',
              tint: {
                bg: 'var(--ui-action-destructive-tint-bg)',
                text: 'var(--ui-action-destructive-tint-text)',
              },
            },
            neutral: {
              bg: 'var(--ui-action-neutral-bg)',
              hover: 'var(--ui-action-neutral-bg-hover)',
              text: 'var(--ui-action-neutral-text)',
              border: 'var(--ui-action-neutral-border)',
              tint: {
                bg: 'var(--ui-action-neutral-tint-bg)',
                text: 'var(--ui-action-neutral-tint-text)',
              },
            },
          },
        },
      },

      fontFamily: {
        sans: ['var(--font-family-sf-pro-text)', 'sans-serif'],
        display: ['var(--font-family-sf-pro-display)', 'sans-serif'],
        mono: ['var(--font-family-sf-mono)', 'monospace'],
      },

      fontSize: {
        '4xs': '0.6875rem',   // 11px
        '3xs': '0.75rem',     // 12px
        '2xs': '0.8125rem',   // 13px
        xs: '0.875rem',       // 14px
        sm: '0.9375rem',      // 15px
        base: '1rem',         // 16px
        lg: '1.0625rem',      // 17px
        xl: '1.125rem',       // 18px
        '2xl': '1.25rem',     // 20px
        '3xl': '1.375rem',    // 22px
        '4xl': '1.5rem',      // 24px
        '5xl': '1.75rem',     // 28px
        '6xl': '2.125rem',    // 34px
        '7xl': '2.5rem',      // 40px
      },

      boxShadow: {
        'helper-frame':
          '0px 4px 40px rgba(238, 238, 238, 1), 0px 4px 8px rgba(66, 71, 76, 0.05), 0px 0px 0.5px rgba(66, 71, 76, 0.32)',
      },
    },
  },
  plugins: [],
};

export default config;
