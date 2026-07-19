import { describe, it, expect, vi } from 'vitest';
import { render } from '@solidjs/testing-library';
import { Avatar } from '../components/Avatar';

describe('Avatar', () => {
  it('renders with default variant (marble)', () => {
    const { container } = render(() => <Avatar name="test" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toBeTruthy();
    expect(svg.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-marble-/);
  });

  it('renders beam variant', () => {
    const { container } = render(() => <Avatar name="test" variant="beam" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-beam-/);
  });

  it('renders pixel variant', () => {
    const { container } = render(() => <Avatar name="test" variant="pixel" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-pixel-/);
  });

  it('renders sunset variant', () => {
    const { container } = render(() => <Avatar name="test" variant="sunset" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-sunset-/);
  });

  it('renders ring variant', () => {
    const { container } = render(() => <Avatar name="test" variant="ring" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-ring-/);
  });

  it('renders bauhaus variant', () => {
    const { container } = render(() => <Avatar name="test" variant="bauhaus" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-bauhaus-/);
  });

  it('renders geometric alias as beam', () => {
    const { container } = render(() => <Avatar name="test" variant="geometric" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-beam-/);
  });

  it('renders abstract alias as bauhaus', () => {
    const { container } = render(() => <Avatar name="test" variant="abstract" />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-bauhaus-/);
  });

  it('falls back to marble for unknown variant', () => {
    const { container } = render(() => <Avatar name="test" variant={'unknown' as any} />);
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-marble-/);
  });

  it('passes size prop to the variant component', () => {
    const { container } = render(() => <Avatar name="test" variant="beam" size={200} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('200');
  });

  it('passes title prop', () => {
    const { container } = render(() => <Avatar name="Alice" title />);
    expect(container.querySelector('title')!.textContent).toBe('Alice');
  });

  it('passes square prop', () => {
    const { container } = render(() => <Avatar name="test" square />);
    const rect = container.querySelector('mask rect')!;
    expect(rect.getAttribute('rx')).toBeFalsy();
  });

  it('passes custom colors to variant components', () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    const { container } = render(() => <Avatar name="test" variant="marble" colors={customColors} />);
    const defaultColors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'];
    const fills = Array.from(container.querySelectorAll('g [fill]')).map(el => el.getAttribute('fill'));
    const hasDefault = fills.some(f => f && defaultColors.includes(f));
    const allCustom = fills.every(f => f && customColors.includes(f));
    expect(hasDefault).toBe(false);
    expect(allCustom).toBe(true);
  });

  it('passes through class attribute', () => {
    const { container } = render(() => <Avatar name="test" class="wrapper-avatar" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('class')).toBe('wrapper-avatar');
  });

  it('passes through data-* attributes to SVG', () => {
    const { container } = render(() => <Avatar name="test" data-testid="avatar-root" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('data-testid')).toBe('avatar-root');
  });

  it('passes through aria-* attributes to SVG', () => {
    const { container } = render(() => <Avatar name="test" aria-label="Avatar" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('aria-label')).toBe('Avatar');
  });

  it('triggers onclick event handler', () => {
    const handleClick = vi.fn();
    const { container } = render(() => <Avatar name="test" onclick={handleClick} />);
    container.querySelector('svg')!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with defaults when no props given', () => {
    const { container } = render(() => <Avatar />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
