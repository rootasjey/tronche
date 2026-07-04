<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

interface Props {
  variant?: 'marble' | 'bauhaus' | 'beam' | 'pixel' | 'ring' | 'sunset';
  name?: string;
  colors?: string[];
  title?: boolean;
  square?: boolean;
  size?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'marble',
  colors: () => ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  name: 'Clara Barton',
  title: false,
  square: false,
  size: 80
});

// Lazy load components for better performance
const AvatarBauhaus = defineAsyncComponent(() => import('./avatar-bauhaus.vue'));
const AvatarRing = defineAsyncComponent(() => import('./avatar-ring.vue'));
const AvatarPixel = defineAsyncComponent(() => import('./avatar-pixel.vue'));
const AvatarBeam = defineAsyncComponent(() => import('./avatar-beam.vue'));
const AvatarSunset = defineAsyncComponent(() => import('./avatar-sunset.vue'));
const AvatarMarble = defineAsyncComponent(() => import('./avatar-marble.vue'));

const AVATAR_VARIANTS = {
  pixel: AvatarPixel,
  bauhaus: AvatarBauhaus,
  ring: AvatarRing,
  beam: AvatarBeam,
  sunset: AvatarSunset,
  marble: AvatarMarble,
  // Deprecated variants for backward compatibility
  geometric: AvatarBeam, // Deprecated, use 'beam'
  abstract: AvatarBauhaus, // Deprecated, use 'bauhaus'
} as const;

const AvatarComponent = computed(() => {
  return AVATAR_VARIANTS[props.variant as keyof typeof AVATAR_VARIANTS] || AvatarMarble;
});

// Forward all props except variant to the selected component
const componentProps = computed(() => {
  const { variant, ...rest } = props;
  return rest;
});
</script>

<template>
  <component 
    :is="AvatarComponent" 
    v-bind="componentProps"
  />
</template>
