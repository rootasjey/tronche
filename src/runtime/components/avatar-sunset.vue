<script setup lang="ts">
import { computed } from 'vue';
import { hashCode, getRandomColor } from '../../lib/utilities';

interface Props {
  name?: string;
  colors?: string[];
  title?: boolean;
  square?: boolean;
  size?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Clara Barton',
  colors: () => ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  title: false,
  square: false,
  size: 80
});

const ELEMENTS = 4;
const SIZE = 80;

function generateColors(name: string, colors: string[]) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  const colorsList = Array.from({ length: ELEMENTS }, (_, i) =>
    getRandomColor(numFromName + i, colors, range),
  );

  return colorsList;
}

const sunsetColors = computed(() => generateColors(props.name, props.colors));
const nameWithoutSpace = computed(() => props.name.replace(/\s/g, ''));
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
    <mask :id="maskID" maskUnits="userSpaceOnUse" x="0" y="0" :width="SIZE" :height="SIZE">
      <rect :width="SIZE" :height="SIZE" :rx="props.square ? undefined : SIZE * 2" fill="#FFFFFF" />
    </mask>
    <g :mask="`url(#${maskID})`">
      <path :fill="`url(#gradient_paint0_linear_${nameWithoutSpace})`" d="M0 0h80v40H0z" />
      <path :fill="`url(#gradient_paint1_linear_${nameWithoutSpace})`" d="M0 40h80v40H0z" />
    </g>
    <defs>
      <linearGradient
        :id="`gradient_paint0_linear_${nameWithoutSpace}`"
        :x1="SIZE / 2"
        y1="0"
        :x2="SIZE / 2"
        :y2="SIZE / 2"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="sunsetColors[0]" />
        <stop offset="1" :stop-color="sunsetColors[1]" />
      </linearGradient>
      <linearGradient
        :id="`gradient_paint1_linear_${nameWithoutSpace}`"
        :x1="SIZE / 2"
        :y1="SIZE / 2"
        :x2="SIZE / 2"
        :y2="SIZE"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="sunsetColors[2]" />
        <stop offset="1" :stop-color="sunsetColors[3]" />
      </linearGradient>
    </defs>
  </svg>
</template>
