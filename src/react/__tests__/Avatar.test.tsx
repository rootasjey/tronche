import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Avatar } from '../components/Avatar';

describe('Avatar', () => {
  it('renders with default variant (marble)', () => {
    const { container } = render(<Avatar name="test" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toBeTruthy();
    expect(svg.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-marble-/);
  });

  it('renders beam variant', () => {
    const { container } = render(<Avatar name="test" variant="beam" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-beam-/);
  });

  it('renders pixel variant', () => {
    const { container } = render(<Avatar name="test" variant="pixel" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-pixel-/);
  });

  it('renders sunset variant', () => {
    const { container } = render(<Avatar name="test" variant="sunset" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-sunset-/);
  });

  it('renders ring variant', () => {
    const { container } = render(<Avatar name="test" variant="ring" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-ring-/);
  });

  it('renders bauhaus variant', () => {
    const { container } = render(<Avatar name="test" variant="bauhaus" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-bauhaus-/);
  });

  it('passes size prop to the variant component', () => {
    const { container } = render(<Avatar name="test" variant="beam" size={200} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('200');
  });

  it('passes title prop', () => {
    const { container } = render(<Avatar name="Alice" title />);
    expect(container.querySelector('title')!.textContent).toBe('Alice');
  });

  it('passes square prop', () => {
    const { container } = render(<Avatar name="test" square />);
    const rect = container.querySelector('mask rect')!;
    expect(rect.getAttribute('rx')).toBeFalsy();
  });
});
