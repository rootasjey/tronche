import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AvatarPixel from '../components/avatar-pixel.vue';

describe('avatar-pixel.vue', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(AvatarPixel, { props: { name: 'test' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders 64 rects (8x8 grid)', () => {
    const wrapper = mount(AvatarPixel, { props: { name: 'test' } });
    expect(wrapper.findAll('rect').length).toBe(65); // 64 pixels + 1 mask rect
  });

  it('renders title when title prop is true', () => {
    const wrapper = mount(AvatarPixel, { props: { name: 'Alice', title: true } });
    expect(wrapper.find('title').text()).toBe('Alice');
  });

  it('sets width and height from size prop', () => {
    const wrapper = mount(AvatarPixel, { props: { name: 'test', size: 160 } });
    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('160');
    expect(svg.attributes('height')).toBe('160');
  });
});
