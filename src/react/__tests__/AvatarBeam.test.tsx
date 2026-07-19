import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AvatarBeam } from '../components/AvatarBeam';

describe('AvatarBeam', () => {
  it('renders an SVG element', () => {
    const { container } = render(<AvatarBeam name="test" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('sets width and height from size prop', () => {
    const { container } = render(<AvatarBeam name="test" size={120} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('120');
    expect(svg.getAttribute('height')).toBe('120');
  });

  it('renders title when title prop is true', () => {
    const { container } = render(<AvatarBeam name="Alice" title />);
    expect(container.querySelector('title')!.textContent).toBe('Alice');
  });

  it('renders a mask with correct id', () => {
    const { container } = render(<AvatarBeam name="test" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-beam-/);
  });

  it('is deterministic: same name produces same mask ID', () => {
    const { container: c1 } = render(<AvatarBeam name="Alice" />);
    const { container: c2 } = render(<AvatarBeam name="Alice" />);
    expect(c1.querySelector('mask')!.getAttribute('id')).toBe(c2.querySelector('mask')!.getAttribute('id'));
  });
});
