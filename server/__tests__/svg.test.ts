import { describe, it, expect } from 'vitest';
import { svg, mask } from '../utils/svg';

describe('svg()', () => {
  it('returns a valid SVG string', () => {
    const result = svg('<circle cx="40" cy="40" r="20" fill="red" />', 80, false, 160, 'm1');
    expect(result).toContain('<svg');
    expect(result).toContain('</svg>');
    expect(result).toContain('width="80"');
    expect(result).toContain('height="80"');
    expect(result).toContain('rx="160"');
    expect(result).toContain('m1');
    expect(result).toContain('<circle');
  });

  it('omits rx when square is true', () => {
    const result = svg('', 80, true, 160, 'm1');
    expect(result).not.toContain('rx=');
  });
});

describe('mask()', () => {
  it('returns a mask element with rx', () => {
    const result = mask(80, false, 'm1');
    expect(result).toContain('<mask');
    expect(result).toContain('rx="160"');
    expect(result).toContain('m1');
  });

  it('omits rx when square is true', () => {
    const result = mask(80, true, 'm1');
    expect(result).not.toContain('rx=');
  });
});
