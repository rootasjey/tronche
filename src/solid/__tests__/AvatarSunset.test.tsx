import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { AvatarSunset } from '../components/AvatarSunset';

describe('AvatarSunset', () => {
  it('renders an SVG element', () => {
    const { container } = render(() => <AvatarSunset name="test" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders linearGradient defs', () => {
    const { container } = render(() => <AvatarSunset name="test" />);
    expect(container.querySelectorAll('linearGradient').length).toBe(2);
  });

  it('renders a mask with correct id', () => {
    const { container } = render(() => <AvatarSunset name="test" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-sunset-/);
  });
});
