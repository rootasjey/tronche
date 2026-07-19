import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AvatarBeam from '../components/avatar-beam.vue';

describe('avatar-beam.vue', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(AvatarBeam, {
      props: { name: 'test' },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders title when title prop is true', () => {
    const wrapper = mount(AvatarBeam, {
      props: { name: 'Bob', title: true },
    });
    expect(wrapper.find('title').exists()).toBe(true);
    expect(wrapper.find('title').text()).toBe('Bob');
  });

  it('renders face elements (eyes and mouth)', () => {
    const wrapper = mount(AvatarBeam, {
      props: { name: 'test' },
    });
    const eyes = wrapper.findAll('rect');
    expect(eyes.length).toBeGreaterThanOrEqual(2);
  });

  it('is deterministic: same name produces same mask ID', () => {
    const w1 = mount(AvatarBeam, { props: { name: 'Alice' } });
    const w2 = mount(AvatarBeam, { props: { name: 'Alice' } });
    expect(w1.find('mask').attributes('id')).toBe(w2.find('mask').attributes('id'));
  });
});
