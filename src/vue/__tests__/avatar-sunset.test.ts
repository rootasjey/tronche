import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AvatarSunset from '../components/avatar-sunset.vue';

describe('avatar-sunset.vue', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(AvatarSunset, { props: { name: 'test' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders gradient defs', () => {
    const wrapper = mount(AvatarSunset, { props: { name: 'test' } });
    expect(wrapper.findAll('linearGradient').length).toBe(2);
  });

  it('renders title when title prop is true', () => {
    const wrapper = mount(AvatarSunset, { props: { name: 'Sunset', title: true } });
    expect(wrapper.find('title').text()).toBe('Sunset');
  });
});
