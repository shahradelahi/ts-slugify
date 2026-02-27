import escapeStringRegexp from '@se-oss/regexp-escape';

export const DEFAULT_PRESERVE_REGEX = /[^a-zA-Z0-9]+/g;
export const DEFAULT_TRIM_REGEX = /^-+|-+$/g;

const preserveCharsCache = new Map<string, RegExp>();

/**
 * Get a regex that matches characters NOT in the allowed list.
 *
 * @param chars - Characters to preserve.
 * @returns The compiled regex.
 */
export function getPreserveRegex(chars: string[]): RegExp {
  if (!chars || chars.length === 0) return DEFAULT_PRESERVE_REGEX;

  const key = chars.join('');
  if (preserveCharsCache.has(key)) return preserveCharsCache.get(key)!;

  const escaped = chars.map((c) => escapeStringRegexp(c)).join('');
  const regex = new RegExp(`[^a-zA-Z0-9${escaped}]+`, 'g');

  preserveCharsCache.set(key, regex);
  return regex;
}

const trimRegexCache = new Map<string, RegExp>();

/**
 * Get a combined regex for trimming start and end separators.
 *
 * @param separator - The separator string.
 * @param preserveLeadingUnderscore - Whether to keep a leading underscore.
 * @param preserveTrailingDash - Whether to keep a trailing dash.
 * @returns The compiled trim regex.
 */
export function getTrimRegex(
  separator: string,
  preserveLeadingUnderscore: boolean,
  preserveTrailingDash: boolean
): RegExp {
  if (separator === '-' && !preserveLeadingUnderscore && !preserveTrailingDash) {
    return DEFAULT_TRIM_REGEX;
  }

  const key = `${separator}|${preserveLeadingUnderscore}|${preserveTrailingDash}`;
  if (trimRegexCache.has(key)) return trimRegexCache.get(key)!;

  const escaped = escapeStringRegexp(separator);
  const start = preserveLeadingUnderscore ? `^${escaped}+(?!_)` : `^${escaped}+`;
  const end = preserveTrailingDash ? `(?<!-)${escaped}+$` : `${escaped}+$`;

  const regex = new RegExp(`${start}|${end}`, 'g');
  trimRegexCache.set(key, regex);
  return regex;
}

/**
 * Convert camelCase or PascalCase to space-separated words.
 *
 * @param str - The string to decamelize.
 * @returns The decamelized string.
 */
export function decamelizeString(str: string): string {
  return str.replace(/([a-z\d])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2');
}

/**
 * Default replacements for common symbols.
 */
export const defaultReplacements: ReadonlyArray<[string, string]> = [
  ['&', ' and '],
  ['+', ' plus '],
  ['☕', ' coffee '],
  ['♥', ' love '],
];

const replacerCache = new Map<string, { regex: RegExp; map: Record<string, string> }>();

/**
 * Get a single-pass replacer for custom character mappings.
 *
 * @param replacements - The character mappings.
 * @returns An object with the compiled regex and a lookup map.
 */
export function getReplacer(replacements: ReadonlyArray<[string, string]>) {
  const key = replacements.map((r) => r[0]).join('');
  if (replacerCache.has(key)) return replacerCache.get(key)!;

  const map: Record<string, string> = {};
  const keys: string[] = [];

  for (const [k, v] of replacements) {
    map[k] = v;
    keys.push(escapeStringRegexp(k));
  }

  const regex = new RegExp(keys.join('|'), 'g');
  const replacer = { regex, map };
  replacerCache.set(key, replacer);
  return replacer;
}
