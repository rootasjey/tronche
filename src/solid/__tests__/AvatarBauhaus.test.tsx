import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { AvatarBauhaus } from '../components/AvatarBauhaus';

describe('AvatarBauhaus', () => {
  it('renders an SVG element', () => {
    const { container } = render(() => <AvatarBauhaus name="test" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('sets width and height from size prop', () => {
    const { container } = render(() => <AvatarBauhaus name="test" size={120} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('120');
  });

  it('renders a mask with correct id', () => {
    const { container } = render(() => <AvatarBauhaus name="test" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-bauhaus-/);
  });
});
