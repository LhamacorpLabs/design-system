export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * Inline script source for a blocking <script> tag in <head>, placed
 * before any stylesheet. Reads the persisted theme (or system
 * preference) and stamps `data-theme` on <html> before first paint,
 * so the page never flashes the wrong theme.
 *
 * Usage (framework-agnostic):
 *
 *   import { NO_FOUC_SCRIPT } from '@lhamacorplabs/design-tokens';
 *   // <script>{NO_FOUC_SCRIPT}</script>  -- inline, in <head>, before your stylesheet
 */
export const NO_FOUC_SCRIPT = `(function () {
	var stored = localStorage.getItem('${STORAGE_KEY}');
	var theme = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	document.documentElement.setAttribute('data-theme', theme);
})();`;

function isBrowser(): boolean {
	return typeof document !== 'undefined' && typeof window !== 'undefined';
}

/** Reads the persisted theme, falling back to the OS preference. Safe to call outside the browser (returns 'light'). */
export function getPreferredTheme(): Theme {
	if (!isBrowser()) return 'light';

	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === 'light' || stored === 'dark') return stored;

	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Reads the theme currently applied to <html>, if any. */
export function getAppliedTheme(): Theme | null {
	if (!isBrowser()) return null;
	const attr = document.documentElement.getAttribute('data-theme');
	return attr === 'light' || attr === 'dark' ? attr : null;
}

/** Stamps `data-theme` on <html> and persists the choice. */
export function applyTheme(theme: Theme): void {
	if (!isBrowser()) return;
	document.documentElement.setAttribute('data-theme', theme);
	window.localStorage.setItem(STORAGE_KEY, theme);
}

/** Flips the currently applied theme and returns the new value. */
export function toggleTheme(): Theme {
	const next: Theme = getAppliedTheme() === 'dark' ? 'light' : 'dark';
	applyTheme(next);
	return next;
}

/** Applies the preferred theme immediately (equivalent to NO_FOUC_SCRIPT, callable from JS instead of an inline tag). */
export function initTheme(): Theme {
	const theme = getPreferredTheme();
	applyTheme(theme);
	return theme;
}
