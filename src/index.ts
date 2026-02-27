import escapeStringRegexp from '@se-oss/regexp-escape';
import doTransliterate from '@se-oss/transliterate';

import type { CountableSlugify, Options } from './typings';
import {
  decamelizeString,
  DEFAULT_PRESERVE_REGEX,
  defaultReplacements,
  getPreserveRegex,
  getReplacer,
  getTrimRegex,
} from './utils';

/**
 * Generate a URL-friendly slug from a string.
 *
 * @param string - The string to slugify.
 * @param options - Slugification options.
 * @returns The generated slug.
 *
 * @example
 * ```ts
 * slugify('I ♥ Cats');
 * // => 'i-love-cats'
 * ```
 */
export function slugify(string: string, options?: Options): string {
  const separator = options?.separator ?? '-';
  const lowercase = options?.lowercase ?? true;
  const decamelize = options?.decamelize ?? true;
  const customReplacements = options?.customReplacements ?? defaultReplacements;
  const transliterate = options?.transliterate ?? true;

  let str = string;

  // 1. Custom Replacements (Single pass)
  if (customReplacements.length > 0) {
    const { regex, map } = getReplacer(customReplacements);
    str = str.replace(regex, (match) => map[match]!);
  }

  // 2. Transliterate
  if (transliterate) {
    const preserveCharacters = options?.preserveCharacters;
    if (preserveCharacters && preserveCharacters.length > 0) {
      const regex = new RegExp(
        `(${preserveCharacters.map((c) => escapeStringRegexp(c)).join('|')})`,
        'g'
      );
      str = str
        .split(regex)
        .map((part) => {
          if (preserveCharacters.includes(part)) return part;
          return doTransliterate(part, { locale: options?.locale });
        })
        .join('');
    } else {
      str = doTransliterate(str, { locale: options?.locale });
    }
  }

  // 3. Decamelize
  if (decamelize) {
    str = decamelizeString(str);
  }

  // 4. Lowercase
  if (lowercase) {
    str = str.toLowerCase();
  }

  // 5. Remove invalid characters AND collapse in ONE PASS!
  const preserveCharacters = options?.preserveCharacters;
  const preserveRegex =
    preserveCharacters && preserveCharacters.length > 0
      ? getPreserveRegex(preserveCharacters)
      : DEFAULT_PRESERVE_REGEX;

  str = str.replace(preserveRegex, separator);

  // 6. Trim leading & trailing separators in ONE PASS!
  if (separator) {
    const trimRegex = getTrimRegex(
      separator,
      options?.preserveLeadingUnderscore ?? false,
      options?.preserveTrailingDash ?? false
    );
    str = str.replace(trimRegex, '');
  }

  // 7. Truncate
  const maxLength = options?.maxLength;
  if (maxLength && str.length > maxLength) {
    str = str.substring(0, maxLength);
    if (separator) {
      str = str.replace(
        getTrimRegex(
          separator,
          options?.preserveLeadingUnderscore ?? false,
          options?.preserveTrailingDash ?? false
        ),
        ''
      );
    }
  }

  return str;
}

/**
 * Create a slugifier that tracks occurrences to prevent collisions.
 *
 * @returns A slugifier instance with a reset method.
 *
 * @example
 * ```ts
 * const slugify = slugifyWithCounter();
 * slugify('foo bar'); // 'foo-bar'
 * slugify('foo bar'); // 'foo-bar-2'
 * ```
 */
export function slugifyWithCounter(): CountableSlugify {
  const occurrences = new Map<string, number>();

  const slugifyInstance = (string: string, options?: Options) => {
    const slug = slugify(string, options);
    const count = occurrences.get(slug) || 0;

    occurrences.set(slug, count + 1);

    const separator = options?.separator ?? '-';
    return count === 0 ? slug : `${slug}${separator}${count + 1}`;
  };

  slugifyInstance.reset = () => occurrences.clear();
  return slugifyInstance as CountableSlugify;
}

export default slugify;
