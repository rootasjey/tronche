import { describe, it, expect } from 'vitest';
import { marble, beam, pixel, sunset, ring, bauhaus } from '../generators';

const COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

describe('server generators', () => {
  const DEFAULTS: Record<string, number> = {
    marble: 80, beam: 36, pixel: 80, sunset: 80, ring: 90, bauhaus: 80,
  };

  it.each([
    ['marble', marble],
    ['beam', beam],
    ['pixel', pixel],
    ['sunset', sunset],
    ['ring', ring],
    ['bauhaus', bauhaus],
  ] as const)('%s generates a valid SVG', (name, generate) => {
    const svg = generate('john', { colors: COLORS });
    const size = DEFAULTS[name];
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain(`<title>john</title>`);
    expect(svg).toContain(`width="${size}"`);
    expect(svg).toContain(`height="${size}"`);
  });

  it.each([
    ['marble', marble],
    ['beam', beam],
    ['pixel', pixel],
    ['sunset', sunset],
    ['ring', ring],
    ['bauhaus', bauhaus],
  ] as const)('%s is deterministic', (name, generate) => {
    const a = generate('john', { colors: COLORS });
    const b = generate('john', { colors: COLORS });
    expect(a).toBe(b);
  });

  it.each([
    ['marble', marble],
    ['beam', beam],
    ['pixel', pixel],
    ['sunset', sunset],
    ['ring', ring],
    ['bauhaus', bauhaus],
  ] as const)('%s accepts size and square options', (name, generate) => {
    const svg = generate('john', { colors: COLORS, size: 200, square: true });
    expect(svg).toContain(`width="200"`);
    expect(svg).toContain(`height="200"`);
  });

  it.each([
    ['marble', marble],
    ['beam', beam],
    ['pixel', pixel],
    ['sunset', sunset],
    ['ring', ring],
    ['bauhaus', bauhaus],
  ] as const)('%s produces different output for different names', (name, generate) => {
    const a = generate('john', { colors: COLORS });
    const b = generate('jane', { colors: COLORS });
    expect(a).not.toBe(b);
  });
});
