<script setup lang="ts">
import { computed } from 'vue';
import AvatarBauhaus from './avatar-bauhaus.vue';
import AvatarRing from './avatar-ring.vue';
import AvatarPixel from './avatar-pixel.vue';
import AvatarBeam from './avatar-beam.vue';
import AvatarSunset from './avatar-sunset.vue';
import AvatarMarble from './avatar-marble.vue';

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
  size: 80,
});

const AVATAR_VARIANTS = {
  pixel: AvatarPixel,
  bauhaus: AvatarBauhaus,
  ring: AvatarRing,
  beam: AvatarBeam,
  sunset: AvatarSunset,
  marble: AvatarMarble,
  geometric: AvatarBeam,
  abstract: AvatarBauhaus,
} as const;

const AvatarComponent = computed(() => {
  return AVATAR_VARIANTS[props.variant as keyof typeof AVATAR_VARIANTS] || AvatarMarble;
});

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
