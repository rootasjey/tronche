import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AvatarBauhaus from '../components/avatar-bauhaus.vue';

describe('avatar-bauhaus.vue', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(AvatarBauhaus, { props: { name: 'test' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders background rect, shape rect, circle, and line', () => {
    const wrapper = mount(AvatarBauhaus, { props: { name: 'test' } });
    const rects = wrapper.findAll('rect');
    expect(rects.length).toBeGreaterThanOrEqual(2); // bg + shape
    expect(wrapper.findAll('circle').length).toBe(1);
    expect(wrapper.findAll('line').length).toBe(1);
  });

  it('renders title when title prop is true', () => {
    const wrapper = mount(AvatarBauhaus, { props: { name: 'Bauhaus', title: true } });
    expect(wrapper.find('title').text()).toBe('Bauhaus');
  });

  it('is deterministic: same name produces same mask ID', () => {
    const w1 = mount(AvatarBauhaus, { props: { name: 'Alice' } });
    const w2 = mount(AvatarBauhaus, { props: { name: 'Alice' } });
    expect(w1.find('mask').attributes('id')).toBe(w2.find('mask').attributes('id'));
  });
});
