<script setup lang="ts">
import { computed } from 'vue';
import { hashCode, getRandomColor } from '../../lib/utilities';
import type { AvatarProps } from '../../lib/types';

interface Props extends AvatarProps {}

const props = withDefaults(defineProps<Props>(), {
  name: 'Clara Barton',
  colors: () => ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  title: false,
  square: false,
  size: 80
});

const ELEMENTS = 64;
const SIZE = 80;

function generateColors(name: string, colors: string[]) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  const colorList = Array.from({ length: ELEMENTS }, (_, i) =>
    getRandomColor(numFromName % (i + 1), colors, range),
  );

  return colorList;
}

const pixelColors = computed(() => generateColors(props.name, props.colors));
const maskID = computed(() => `mask-${hashCode(props.name)}`);
</script>

<template>
  <svg
    :viewBox="`0 0 ${SIZE} ${SIZE}`"
    fill="none"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
    v-bind="$attrs"
  >
    <title v-if="props.title">{{ props.name }}</title>
    <mask
      :id="maskID"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      :width="SIZE"
      :height="SIZE"
    >
      <rect :width="SIZE" :height="SIZE" :rx="props.square ? undefined : SIZE * 2" fill="#FFFFFF" />
    </mask>
    <g :mask="`url(#${maskID})`">
      <!-- Generate 8x8 pixel grid -->
      <rect width="10" height="10" :fill="pixelColors[0]" />
      <rect x="20" width="10" height="10" :fill="pixelColors[1]" />
      <rect x="40" width="10" height="10" :fill="pixelColors[2]" />
      <rect x="60" width="10" height="10" :fill="pixelColors[3]" />
      <rect x="10" width="10" height="10" :fill="pixelColors[4]" />
      <rect x="30" width="10" height="10" :fill="pixelColors[5]" />
      <rect x="50" width="10" height="10" :fill="pixelColors[6]" />
      <rect x="70" width="10" height="10" :fill="pixelColors[7]" />
      
      <!-- Row 2 -->
      <rect y="10" width="10" height="10" :fill="pixelColors[8]" />
      <rect y="20" width="10" height="10" :fill="pixelColors[9]" />
      <rect y="30" width="10" height="10" :fill="pixelColors[10]" />
      <rect y="40" width="10" height="10" :fill="pixelColors[11]" />
      <rect y="50" width="10" height="10" :fill="pixelColors[12]" />
      <rect y="60" width="10" height="10" :fill="pixelColors[13]" />
      <rect y="70" width="10" height="10" :fill="pixelColors[14]" />
      
      <!-- Continue with remaining pixels... -->
      <rect x="20" y="10" width="10" height="10" :fill="pixelColors[15]" />
      <rect x="20" y="20" width="10" height="10" :fill="pixelColors[16]" />
      <rect x="20" y="30" width="10" height="10" :fill="pixelColors[17]" />
      <rect x="20" y="40" width="10" height="10" :fill="pixelColors[18]" />
      <rect x="20" y="50" width="10" height="10" :fill="pixelColors[19]" />
      <rect x="20" y="60" width="10" height="10" :fill="pixelColors[20]" />
      <rect x="20" y="70" width="10" height="10" :fill="pixelColors[21]" />
      
      <!-- Add remaining pixels for complete 8x8 grid -->
      <rect v-for="(color, index) in pixelColors.slice(22)" 
            :key="index + 22"
            :x="((index + 22) % 8) * 10" 
            :y="Math.floor((index + 22) / 8) * 10" 
            width="10" 
            height="10" 
            :fill="color" />
    </g>
  </svg>
</template>
