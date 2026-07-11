import { describe, it, expect } from 'vitest';
import {
  hashCode,
  getModulus,
  getDigit,
  getBoolean,
  getAngle,
  getUnit,
  getRandomColor,
  getContrast,
} from '../utilities';

describe('hashCode', () => {
  it('returns a deterministic positive integer', () => {
    const result = hashCode('john');
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('returns the same value for the same input', () => {
    expect(hashCode('john')).toBe(hashCode('john'));
  });

  it('returns different values for different inputs', () => {
    expect(hashCode('john')).not.toBe(hashCode('jane'));
  });

  it('handles empty string', () => {
    expect(hashCode('')).toBe(0);
  });
});

describe('getModulus', () => {
  it('returns the remainder of division', () => {
    expect(getModulus(10, 3)).toBe(1);
  });

  it('returns 0 when evenly divisible', () => {
    expect(getModulus(9, 3)).toBe(0);
  });
});

describe('getDigit', () => {
  it('returns the nth digit from the right', () => {
    expect(getDigit(12345, 0)).toBe(5);
    expect(getDigit(12345, 1)).toBe(4);
    expect(getDigit(12345, 4)).toBe(1);
  });
});

describe('getBoolean', () => {
  it('returns a boolean', () => {
    expect(typeof getBoolean(12345, 1)).toBe('boolean');
  });

  it('returns true when digit is even', () => {
    expect(getBoolean(2468, 0)).toBe(true);
  });

  it('returns false when digit is odd', () => {
    expect(getBoolean(12345, 0)).toBe(false);
  });
});

describe('getAngle', () => {
  it('returns 0 for positive x-axis', () => {
    expect(getAngle(1, 0)).toBe(0);
  });

  it('returns 90 for positive y-axis', () => {
    expect(getAngle(0, 1)).toBe(90);
  });
});

describe('getUnit', () => {
  it('returns a number within the range', () => {
    const result = getUnit(42, 100);
    expect(Math.abs(result)).toBeLessThan(100);
  });

  it('can return negative values', () => {
    const result = getUnit(42, 100, 0);
    expect(typeof result).toBe('number');
  });
});

describe('getRandomColor', () => {
  it('returns a color from the palette', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    const result = getRandomColor(0, colors, colors.length);
    expect(colors).toContain(result);
  });

  it('is deterministic', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    expect(getRandomColor(0, colors, colors.length)).toBe(
      getRandomColor(0, colors, colors.length),
    );
  });
});

describe('getContrast', () => {
  it('returns black for light colors', () => {
    expect(getContrast('#ffffff')).toBe('#000000');
    expect(getContrast('#ffff00')).toBe('#000000');
  });

  it('returns white for dark colors', () => {
    expect(getContrast('#000000')).toBe('#FFFFFF');
    expect(getContrast('#ff0000')).toBe('#FFFFFF');
  });

  it('handles hex without hash prefix', () => {
    expect(getContrast('ffffff')).toBe('#000000');
  });
});
