/**
 * JS/TS mirror of the CSS custom properties in `css/tokens.css`, for
 * programmatic use — e.g. building a Tailwind theme extension, or
 * reading a token value in JS without touching the DOM.
 *
 * Keys are the camelCase form of the CSS custom property name (e.g.
 * `--surface-hover` -> `surfaceHover`). Values are plain strings, not
 * `var()` references — these are the same literal values as
 * tokens.css, kept in sync by hand. If you can use the CSS file
 * directly, prefer that; reach for this module only when you need the
 * values in JS/TS (e.g. a Tailwind theme extension).
 */

export const fontMono =
	"'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace";

export const radii = {
	sm: '8px',
	md: '12px',
	lg: '18px',
	pill: '999px'
} as const;

export const gap = '20px';

export const spacing = {
	1: '0.25rem',
	2: '0.5rem',
	3: '0.75rem',
	4: '1rem',
	5: '1.25rem',
	6: '1.5rem',
	8: '2rem',
	10: '2.5rem',
	12: '3rem'
} as const;

export const fontSize = {
	xs: '0.75rem',
	sm: '0.8125rem',
	base: '0.875rem',
	md: '0.9375rem',
	lg: '1rem',
	xl: '1.125rem',
	'2xl': '1.25rem',
	'3xl': '1.5rem',
	'4xl': '1.75rem'
} as const;

export const motion = {
	duration: {
		fast: '0.1s',
		base: '0.15s',
		slow: '0.2s',
		slower: '0.3s'
	},
	ease: {
		standard: 'ease',
		out: 'ease-out'
	}
} as const;

export interface ColorTokens {
	bgGradient: string;
	surface: string;
	surfaceHover: string;
	surfaceAlt: string;
	panelBg: string;

	textPrimary: string;
	textSecondary: string;
	textMuted: string;

	accent: string;
	accentHover: string;
	accentContrast: string;
	accentSubtle: string;
	accentShadow: string;

	border: string;
	borderHover: string;
	borderFocus: string;
	focusRing: string;
	inputBg: string;

	successBg: string;
	successText: string;
	successBorder: string;
	errorBg: string;
	errorText: string;
	errorBorder: string;
	danger: string;
	dangerHover: string;
	warningText: string;
	warningBg: string;
	warningBorder: string;

	shadowSm: string;
	shadowMd: string;
	shadowLg: string;
}

export const lightColors: ColorTokens = {
	bgGradient: 'linear-gradient(135deg, #f7dce8 0%, #e7d8f1 30%, #d7dff5 65%, #cfe9ee 100%)',
	surface: '#f5f6fb',
	surfaceHover: '#eceef6',
	surfaceAlt: '#e2e5f0',
	panelBg: '#eceef5',

	textPrimary: '#262a3d',
	textSecondary: '#666b84',
	textMuted: '#9599ac',

	accent: '#2c2f45',
	accentHover: '#3d4160',
	accentContrast: '#f7f7fb',
	accentSubtle: 'rgba(44, 47, 69, 0.08)',
	accentShadow: 'rgba(44, 47, 69, 0.12)',

	border: '#d9dce7',
	borderHover: '#c2c6d8',
	borderFocus: '#3b6fed',
	focusRing: 'rgba(59, 111, 237, 0.2)',
	inputBg: '#ffffff',

	successBg: 'rgba(43, 148, 105, 0.1)',
	successText: '#237a56',
	successBorder: 'rgba(43, 148, 105, 0.28)',
	errorBg: 'rgba(214, 79, 79, 0.1)',
	errorText: '#b23b3b',
	errorBorder: 'rgba(214, 79, 79, 0.28)',
	danger: '#c94747',
	dangerHover: '#b23b3b',
	warningText: '#9a6b1f',
	warningBg: 'rgba(184, 134, 44, 0.12)',
	warningBorder: 'rgba(184, 134, 44, 0.3)',

	shadowSm: '0 1px 2px rgba(35, 27, 58, 0.05)',
	shadowMd: '0 10px 28px rgba(35, 27, 58, 0.08)',
	shadowLg: '0 20px 56px rgba(35, 27, 58, 0.16)'
};

export const darkColors: ColorTokens = {
	bgGradient: 'linear-gradient(135deg, #1c1730 0%, #171b30 30%, #12162a 65%, #0f1a1e 100%)',
	surface: '#1b1d2b',
	surfaceHover: '#23263a',
	surfaceAlt: '#292c44',
	panelBg: '#191b28',

	textPrimary: '#e9eaf3',
	textSecondary: '#a3a7c0',
	textMuted: '#6c7091',

	accent: '#e9eaf3',
	accentHover: '#ffffff',
	accentContrast: '#171928',
	accentSubtle: 'rgba(233, 234, 243, 0.08)',
	accentShadow: 'rgba(233, 234, 243, 0.12)',

	border: '#2e3149',
	borderHover: '#3d4160',
	borderFocus: '#7c98ff',
	focusRing: 'rgba(124, 152, 255, 0.28)',
	inputBg: '#14151f',

	successBg: 'rgba(52, 211, 153, 0.12)',
	successText: '#4ade80',
	successBorder: 'rgba(52, 211, 153, 0.28)',
	errorBg: 'rgba(248, 113, 113, 0.12)',
	errorText: '#f87171',
	errorBorder: 'rgba(248, 113, 113, 0.28)',
	danger: '#f87171',
	dangerHover: '#fca5a5',
	warningText: '#f0b429',
	warningBg: 'rgba(240, 180, 41, 0.14)',
	warningBorder: 'rgba(240, 180, 41, 0.3)',

	shadowSm: '0 1px 2px rgba(0, 0, 0, 0.3)',
	shadowMd: '0 10px 28px rgba(0, 0, 0, 0.35)',
	shadowLg: '0 20px 56px rgba(0, 0, 0, 0.5)'
};

export const colors = {
	light: lightColors,
	dark: darkColors
} as const;
