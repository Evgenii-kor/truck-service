import { SERVICES, BRANDS } from './data';

describe('data', () => {
  it('has unique service slugs', () => {
    const slugs = SERVICES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has brands', () => {
    expect(BRANDS.length).toBeGreaterThan(0);
  });
});
