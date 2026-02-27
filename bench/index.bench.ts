import mySlugify from '@se-oss/slugify';
import sindreSlugify from '@sindresorhus/slugify';
import standardSlugify from 'slugify';
import { bench, describe } from 'vitest';

const fixture = 'Я люблю единорогов. أهلا بك. fooBar Baz!';

describe('Slugify Benchmark', () => {
  bench('@se-oss/slugify', () => {
    mySlugify(fixture, { decamelize: false });
  });

  bench('@sindresorhus/slugify', () => {
    sindreSlugify(fixture);
  });

  bench('simov/slugify', () => {
    standardSlugify(fixture, { lower: true });
  });
});
