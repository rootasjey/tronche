import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Avatar from '../components/Avatar.vue';

describe('Avatar.vue', () => {
  it('renders with default variant (marble)', () => {
    const wrapper = shallowMount(Avatar, { props: { name: 'test' } });
    expect(wrapper.findComponent({ name: 'AvatarMarble' }).exists()).toBe(true);
  });

  it('selects beam variant', () => {
    const wrapper = shallowMount(Avatar, { props: { name: 'test', variant: 'beam' } });
    expect(wrapper.findComponent({ name: 'AvatarBeam' }).exists()).toBe(true);
  });

  it('selects pixel variant', () => {
    const wrapper = shallowMount(Avatar, { props: { name: 'test', variant: 'pixel' } });
    expect(wrapper.findComponent({ name: 'AvatarPixel' }).exists()).toBe(true);
  });

  it('selects sunset variant', () => {
    const wrapper = shallowMount(Avatar, { props: { name: 'test', variant: 'sunset' } });
    expect(wrapper.findComponent({ name: 'AvatarSunset' }).exists()).toBe(true);
  });

  it('selects ring variant', () => {
    const wrapper = shallowMount(Avatar, { props: { name: 'test', variant: 'ring' } });
    expect(wrapper.findComponent({ name: 'AvatarRing' }).exists()).toBe(true);
  });

  it('selects bauhaus variant', () => {
    const wrapper = shallowMount(Avatar, { props: { name: 'test', variant: 'bauhaus' } });
    expect(wrapper.findComponent({ name: 'AvatarBauhaus' }).exists()).toBe(true);
  });
});
