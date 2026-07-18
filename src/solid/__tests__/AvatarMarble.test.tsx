import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { AvatarMarble } from '../components/AvatarMarble';

describe('AvatarMarble', () => {
  it('renders an SVG element', () => {
    const { container } = render(() => <AvatarMarble name="test" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('sets width and height from size prop', () => {
    const { container } = render(() => <AvatarMarble name="test" size={120} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('120');
    expect(svg.getAttribute('height')).toBe('120');
  });

  it('renders a mask with the correct id', () => {
    const { container } = render(() => <AvatarMarble name="test" />);
    const mask = container.querySelector('mask');
    expect(mask).toBeTruthy();
    expect(mask!.getAttribute('id')).toMatch(/^tronche-mask-marble-/);
  });

  it('renders title when title prop is true', () => {
    const { container } = render(() => <AvatarMarble name="Alice" title />);
    const title = container.querySelector('title');
    expect(title).toBeTruthy();
    expect(title!.textContent).toBe('Alice');
  });

  it('does not render title when title prop is false', () => {
    const { container } = render(() => <AvatarMarble name="Alice" title={false} />);
    expect(container.querySelector('title')).toBeNull();
  });

  it('renders correct number of rects and paths', () => {
    const { container } = render(() => <AvatarMarble name="test" />);
    expect(container.querySelectorAll('rect').length).toBeGreaterThanOrEqual(1);
    expect(container.querySelectorAll('path').length).toBe(2);
  });

  it('applies square mask when square prop is true', () => {
    const { container } = render(() => <AvatarMarble name="test" square />);
    const rect = container.querySelector('mask rect')!;
    expect(rect.getAttribute('rx')).toBeFalsy();
  });

  it('applies round mask by default', () => {
    const { container } = render(() => <AvatarMarble name="test" />);
    const rect = container.querySelector('mask rect')!;
    expect(rect.getAttribute('rx')).toBeTruthy();
  });
});
