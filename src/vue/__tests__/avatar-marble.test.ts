import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AvatarMarble from '../components/avatar-marble.vue';

describe('avatar-marble.vue', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'test' },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('sets width and height from size prop', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'test', size: 120 },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('120');
    expect(svg.attributes('height')).toBe('120');
  });

  it('accepts size as string', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'test', size: '120' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('120');
  });

  it('accepts size as percentage string', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'test', size: '100%' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('100%');
    expect(svg.attributes('height')).toBe('100%');
  });

  it('renders a mask with the correct id', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'test' },
    });
    const mask = wrapper.find('mask');
    expect(mask.exists()).toBe(true);
    expect(mask.attributes('id')).toMatch(/^tronche-mask-marble-/);
  });

  it('renders title when title prop is true', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'Alice', title: true },
    });
    expect(wrapper.find('title').exists()).toBe(true);
    expect(wrapper.find('title').text()).toBe('Alice');
  });

  it('does not render title when title prop is false', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'Alice', title: false },
    });
    expect(wrapper.find('title').exists()).toBe(false);
  });

  it('renders correct number of rects and paths', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'test' },
    });
    expect(wrapper.findAll('rect').length).toBeGreaterThanOrEqual(1);
    expect(wrapper.findAll('path').length).toBe(2);
  });

  it('applies square mask when square prop is true', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'test', square: true },
    });
    const rect = wrapper.find('mask rect');
    expect(rect.attributes('rx')).toBeUndefined();
  });

  it('applies round mask by default', () => {
    const wrapper = mount(AvatarMarble, {
      props: { name: 'test' },
    });
    const rect = wrapper.find('mask rect');
    expect(rect.attributes('rx')).toBeDefined();
  });

  it('accepts custom colors', () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    const wrapper = mount(AvatarMarble, {
      props: { name: 'test', colors: customColors },
    });
    const defaultColors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'];
    const fills = wrapper.findAll('g [fill]').map(el => el.attributes('fill'));
    const allFromCustom = fills.every(f => f && customColors.includes(f));
    const anyFromDefault = fills.some(f => f && defaultColors.includes(f));
    expect(allFromCustom).toBe(true);
    expect(anyFromDefault).toBe(false);
  });

  it('is deterministic: same name produces same mask ID', () => {
    const w1 = mount(AvatarMarble, { props: { name: 'Alice' } });
    const w2 = mount(AvatarMarble, { props: { name: 'Alice' } });
    expect(w1.find('mask').attributes('id')).toBe(w2.find('mask').attributes('id'));
  });

  it('different names produce different mask IDs', () => {
    const w1 = mount(AvatarMarble, { props: { name: 'Alice' } });
    const w2 = mount(AvatarMarble, { props: { name: 'Bob' } });
    expect(w1.find('mask').attributes('id')).not.toBe(w2.find('mask').attributes('id'));
  });

  it('renders with empty name', () => {
    const wrapper = mount(AvatarMarble, { props: { name: '' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders with very long name', () => {
    const wrapper = mount(AvatarMarble, { props: { name: 'A'.repeat(1000) } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders with special characters (accents, emojis)', () => {
    const wrapper = mount(AvatarMarble, { props: { name: 'Jérôme 🎉 日本語' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders with name containing only whitespace', () => {
    const wrapper = mount(AvatarMarble, { props: { name: '   ' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
