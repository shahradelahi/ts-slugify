/**
 * Options for slugification.
 */
export interface Options {
  /**
   * The separator to use between words.
   * @default '-'
   */
  separator?: string;
  /**
   * Whether to lowercase the slug.
   * @default true
   */
  lowercase?: boolean;
  /**
   * Whether to decamelize the string (e.g., 'fooBar' -> 'foo-bar').
   * @default true
   */
  decamelize?: boolean;
  /**
   * Custom replacements to apply before other transformations.
   */
  customReplacements?: ReadonlyArray<[string, string]>;
  /**
   * Whether to preserve a leading underscore.
   * @default false
   */
  preserveLeadingUnderscore?: boolean;
  /**
   * Whether to preserve a trailing dash.
   * @default false
   */
  preserveTrailingDash?: boolean;
  /**
   * Characters to preserve as-is.
   */
  preserveCharacters?: string[];
  /**
   * Whether to transliterate the string.
   * @default true
   */
  transliterate?: boolean;
  /**
   * BCP-47 language tag for language-specific transliteration.
   */
  locale?: string;
  /**
   * Maximum length of the slug.
   */
  maxLength?: number;
}

/**
 * A slugifier function that tracks occurrences to prevent collisions.
 */
export interface CountableSlugify {
  (string: string, options?: Options): string;
  /**
   * Resets the occurrence counter.
   */
  reset: () => void;
}
