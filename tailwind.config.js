const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family-sf-pro-text)', 'sans-serif'],
        display: ['var(--font-family-sf-pro-display)', 'sans-serif'],
        mono: ['var(--font-family-sf-mono)', 'monospace'],
      },
      fontSize: {
        '4xs': '0.6875rem',
        '3xs': '0.75rem',
        '2xs': '0.8125rem',
        xs: '0.875rem',
        sm: '0.9375rem',
        base: '1rem',
        lg: '1.0625rem',
        xl: '1.125rem',
        '2xl': '1.25rem',
        '3xl': '1.375rem',
        '4xl': '1.5rem',
        '5xl': '1.75rem',
        '6xl': '2.125rem',
        '7xl': '2.5rem',
      },
      colors: {
        system: {
          red: 'var(--system-red)',
          orange: 'var(--system-orange)',
          yellow: 'var(--system-yellow)',
          green: 'var(--system-green)',
          teal: 'var(--system-teal)',
          blue: 'var(--system-blue)',
          indigo: 'var(--system-indigo)',
          purple: 'var(--system-purple)',
          pink: 'var(--system-pink)',
          gray: {
            DEFAULT: 'var(--system-gray)',
            '02': 'var(--gray-02)',
            '03': 'var(--gray-03)',
            '04': 'var(--gray-04)',
            '05': 'var(--gray-05)',
            '06': 'var(--gray-06)',
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
        fill: {
          light: 'var(--color-fill-light)',
          lightTransparent: 'var(--color-fill-light-transparent)',
          dark: 'var(--color-fill-dark)',
          darkTransparent: 'var(--color-fill-dark-transparent)',
        },
      },
      boxShadow: {
        'helper-frame': '0px 4px 40px rgba(238, 238, 238, 1), 0px 4px 8px rgba(66, 71, 76, 0.05), 0px 0px 0.5px rgba(66, 71, 76, 0.32)',
      },
    },
  },
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
}
export default config
