import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AvatarRing } from '../components/AvatarRing';

describe('AvatarRing', () => {
  it('renders an SVG element', () => {
    const { container } = render(<AvatarRing name="test" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders a circle for the center', () => {
    const { container } = render(<AvatarRing name="test" />);
    expect(container.querySelector('circle')).toBeTruthy();
  });

  it('renders a mask with correct id', () => {
    const { container } = render(<AvatarRing name="test" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-ring-/);
  });

  it('is deterministic: same name produces same mask ID', () => {
    const { container: c1 } = render(<AvatarRing name="Alice" />);
    const { container: c2 } = render(<AvatarRing name="Alice" />);
    expect(c1.querySelector('mask')!.getAttribute('id')).toBe(c2.querySelector('mask')!.getAttribute('id'));
  });
});
