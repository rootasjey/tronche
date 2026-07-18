import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { AvatarPixel } from '../components/AvatarPixel';

describe('AvatarPixel', () => {
  it('renders an SVG element', () => {
    const { container } = render(() => <AvatarPixel name="test" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders 64 pixel rects', () => {
    const { container } = render(() => <AvatarPixel name="test" />);
    expect(container.querySelectorAll('rect').length).toBe(65);
  });

  it('renders a mask with correct id', () => {
    const { container } = render(() => <AvatarPixel name="test" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-pixel-/);
  });
});
