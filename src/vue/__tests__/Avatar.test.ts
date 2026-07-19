import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

vi.mock('../components/avatar-marble.vue');
vi.mock('../components/avatar-beam.vue');
vi.mock('../components/avatar-pixel.vue');
vi.mock('../components/avatar-sunset.vue');
vi.mock('../components/avatar-ring.vue');
vi.mock('../components/avatar-bauhaus.vue');

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

  it('selects geometric alias as beam', () => {
    const wrapper = shallowMount(Avatar, { props: { name: 'test', variant: 'geometric' } });
    expect(wrapper.findComponent({ name: 'AvatarBeam' }).exists()).toBe(true);
  });

  it('selects abstract alias as bauhaus', () => {
    const wrapper = shallowMount(Avatar, { props: { name: 'test', variant: 'abstract' } });
    expect(wrapper.findComponent({ name: 'AvatarBauhaus' }).exists()).toBe(true);
  });

  it('falls back to marble for unknown variant', () => {
    const wrapper = shallowMount(Avatar, { props: { name: 'test', variant: 'unknown' } });
    expect(wrapper.findComponent({ name: 'AvatarMarble' }).exists()).toBe(true);
  });
});
