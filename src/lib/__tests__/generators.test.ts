import { describe, it, expect } from 'vitest';
import {
  generateMarbleData,
  generateMarbleSvg,
  renderMarbleSvg,
  generateBeamData,
  generateBeamSvg,
  renderBeamSvg,
  generatePixelData,
  generatePixelSvg,
  renderPixelSvg,
  generateSunsetData,
  generateSunsetSvg,
  renderSunsetSvg,
  generateRingData,
  generateRingSvg,
  renderRingSvg,
  generateBauhausData,
  generateBauhausSvg,
  renderBauhausSvg,
} from '../generators';

const COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
const NAME = 'john';

describe('marble generator', () => {
  it('generateMarbleData returns deterministic elements', () => {
    const data = generateMarbleData(NAME, COLORS);
    expect(data.elements).toHaveLength(3);
    expect(data.maskId).toContain('marble');
    expect(data.maskId).toContain(String(hashCode(NAME)));
    data.elements.forEach((el) => {
      expect(COLORS).toContain(el.color);
      expect(typeof el.translateX).toBe('number');
      expect(typeof el.translateY).toBe('number');
      expect(typeof el.scale).toBe('number');
      expect(typeof el.rotate).toBe('number');
    });
  });

  it('generateMarbleData is deterministic', () => {
    const a = generateMarbleData(NAME, COLORS);
    const b = generateMarbleData(NAME, COLORS);
    expect(a).toEqual(b);
  });

  it('generateMarbleSvg returns an SVG string', () => {
    const svg = generateMarbleSvg(NAME, COLORS);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('tronche-mask-marble');
  });

  it('renderMarbleSvg accepts custom options', () => {
    const data = generateMarbleData(NAME, COLORS);
    const svg = renderMarbleSvg(data, { size: 200, square: true, title: 'Test' });
    expect(svg).toContain('width="200"');
    expect(svg).toContain('height="200"');
    expect(svg).toContain('<title>Test</title>');
    expect(svg).not.toContain('rx=');
  });
});

describe('beam generator', () => {
  it('generateBeamData returns deterministic data', () => {
    const data = generateBeamData(NAME, COLORS);
    expect(COLORS).toContain(data.wrapperColor);
    expect(COLORS).toContain(data.backgroundColor);
    expect([data.faceColor]).toContain('#000000' || '#FFFFFF');
    expect(data.maskId).toContain('beam');
    expect(typeof data.isMouthOpen).toBe('boolean');
    expect(typeof data.isCircle).toBe('boolean');
  });

  it('generateBeamData is deterministic', () => {
    const a = generateBeamData(NAME, COLORS);
    const b = generateBeamData(NAME, COLORS);
    expect(a).toEqual(b);
  });

  it('generateBeamSvg returns an SVG string', () => {
    const svg = generateBeamSvg(NAME, COLORS);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('tronche-mask-beam');
  });

  it('renderBeamSvg accepts custom options', () => {
    const data = generateBeamData(NAME, COLORS);
    const svg = renderBeamSvg(data, { size: 72, title: 'Beam' });
    expect(svg).toContain('width="72"');
    expect(svg).toContain('<title>Beam</title>');
  });
});

describe('pixel generator', () => {
  it('generatePixelData returns 64 colors', () => {
    const data = generatePixelData(NAME, COLORS);
    expect(data.colors).toHaveLength(64);
    expect(data.maskId).toContain('pixel');
  });

  it('generatePixelData is deterministic', () => {
    const a = generatePixelData(NAME, COLORS);
    const b = generatePixelData(NAME, COLORS);
    expect(a).toEqual(b);
  });

  it('generatePixelSvg returns an SVG string', () => {
    const svg = generatePixelSvg(NAME, COLORS);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('tronche-mask-pixel');
  });

  it('renderPixelSvg accepts custom options', () => {
    const data = generatePixelData(NAME, COLORS);
    const svg = renderPixelSvg(data, { square: true });
    expect(svg).not.toContain('rx=');
  });
});

describe('sunset generator', () => {
  it('generateSunsetData returns 4 colors', () => {
    const data = generateSunsetData(NAME, COLORS);
    expect(data.colors).toHaveLength(4);
    expect(data.nameWithoutSpace).toBe(NAME);
    expect(data.maskId).toContain('sunset');
  });

  it('generateSunsetData removes spaces from name', () => {
    const data = generateSunsetData('john doe', COLORS);
    expect(data.nameWithoutSpace).toBe('johndoe');
  });

  it('generateSunsetData is deterministic', () => {
    const a = generateSunsetData(NAME, COLORS);
    const b = generateSunsetData(NAME, COLORS);
    expect(a).toEqual(b);
  });

  it('generateSunsetSvg returns an SVG string', () => {
    const svg = generateSunsetSvg(NAME, COLORS);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('tronche-mask-sunset');
    expect(svg).toContain('linearGradient');
  });
});

describe('ring generator', () => {
  it('generateRingData returns 9 colors', () => {
    const data = generateRingData(NAME, COLORS);
    expect(data.colors).toHaveLength(9);
    expect(data.maskId).toContain('ring');
  });

  it('generateRingData is deterministic', () => {
    const a = generateRingData(NAME, COLORS);
    const b = generateRingData(NAME, COLORS);
    expect(a).toEqual(b);
  });

  it('generateRingSvg returns an SVG string', () => {
    const svg = generateRingSvg(NAME, COLORS);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('tronche-mask-ring');
  });
});

describe('bauhaus generator', () => {
  it('generateBauhausData returns 4 elements', () => {
    const data = generateBauhausData(NAME, COLORS);
    expect(data.elements).toHaveLength(4);
    expect(data.maskId).toContain('bauhaus');
    data.elements.forEach((el) => {
      expect(COLORS).toContain(el.color);
      expect(typeof el.isSquare).toBe('boolean');
    });
  });

  it('generateBauhausData is deterministic', () => {
    const a = generateBauhausData(NAME, COLORS);
    const b = generateBauhausData(NAME, COLORS);
    expect(a).toEqual(b);
  });

  it('generateBauhausSvg returns an SVG string', () => {
    const svg = generateBauhausSvg(NAME, COLORS);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('tronche-mask-bauhaus');
  });

  it('renderBauhausSvg uses square mask when square option is true', () => {
    const data = generateBauhausData(NAME, COLORS);
    const svg = renderBauhausSvg(data, { square: true });
    expect(svg).not.toContain('rx=');
  });
});

function hashCode(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const character = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
