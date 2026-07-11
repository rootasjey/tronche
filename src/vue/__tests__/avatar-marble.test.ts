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
});
