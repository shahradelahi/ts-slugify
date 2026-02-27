import { describe, expect, it } from 'vitest';

import slugify, { slugifyWithCounter } from './index';

describe('slugify', () => {
  it('should slugify basic strings', () => {
    expect(slugify('I ♥ Cats')).toBe('i-love-cats');
    expect(slugify('Я люблю единорогов')).toBe('ya-lyublyu-edinorogov');
    expect(slugify('  Déjà Vu!  ')).toBe('deja-vu');
  });

  it('should handle default replacements', () => {
    expect(slugify('Fish & Chips')).toBe('fish-and-chips');
    expect(slugify('1 + 1')).toBe('1-plus-1');
    expect(slugify('☕ coffee')).toBe('coffee-coffee');
  });

  it('should handle empty separator', () => {
    expect(slugify('foo bar', { separator: '' })).toBe('foobar');
  });

  it('should decamelize', () => {
    expect(slugify('fooBar')).toBe('foo-bar');
    expect(slugify('fooBar', { decamelize: false })).toBe('foobar');
  });

  it('should preserve characters', () => {
    expect(slugify('foo_bar#baz', { preserveCharacters: ['#'] })).toBe('foo-bar#baz');
  });

  it('should handle custom separator', () => {
    expect(slugify('foo bar', { separator: '_' })).toBe('foo_bar');
  });

  it('should truncate to maxLength', () => {
    expect(slugify('this is a long string', { maxLength: 10 })).toBe('this-is-a');
  });
});

describe('slugifyWithCounter', () => {
  it('should increment collisions', () => {
    const slug = slugifyWithCounter();
    expect(slug('foo bar')).toBe('foo-bar');
    expect(slug('foo bar')).toBe('foo-bar-2');

    slug.reset();
    expect(slug('foo bar')).toBe('foo-bar');
  });
});
