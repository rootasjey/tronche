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
      <rect v-for="(color, index) in pixelColors" :key="index"
            :x="(index % 8) * 10" :y="Math.floor(index / 8) * 10"
            width="10" height="10" :fill="color" />
    </g>
  </svg>
</template>
