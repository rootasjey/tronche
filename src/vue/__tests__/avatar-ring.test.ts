import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AvatarRing from '../components/avatar-ring.vue';

describe('avatar-ring.vue', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(AvatarRing, { props: { name: 'test' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders 8 paths and 1 circle', () => {
    const wrapper = mount(AvatarRing, { props: { name: 'test' } });
    expect(wrapper.findAll('path').length).toBe(8);
    expect(wrapper.findAll('circle').length).toBe(1);
  });

  it('renders title when title prop is true', () => {
    const wrapper = mount(AvatarRing, { props: { name: 'Ring', title: true } });
    expect(wrapper.find('title').text()).toBe('Ring');
  });
});
