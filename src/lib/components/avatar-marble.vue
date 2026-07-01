<script setup lang="ts">
import { computed } from 'vue';
import { hashCode, getUnit, getRandomColor } from '../utilities';

interface Props {
  name?: string;
  colors?: string[];
  title?: boolean;
  square?: boolean;
  size?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Clara Barton',
  colors: () => ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  title: false,
  square: false,
  size: 80
});

const ELEMENTS = 3;
const SIZE = 80;

function generateColors(name: string, colors: string[]) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  const elementsProperties = Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), SIZE / 10, 1),
    translateY: getUnit(numFromName * (i + 1), SIZE / 10, 2),
    scale: 1.2 + getUnit(numFromName * (i + 1), SIZE / 20) / 10,
    rotate: getUnit(numFromName * (i + 1), 360, 1),
  }));

  return elementsProperties;
}

const properties = computed(() => generateColors(props.name, props.colors));
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
      <rect :width="SIZE" :height="SIZE" :fill="properties[0].color" />
      <path
        :filter="`url(#filter_${maskID})`"
        d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
        :fill="properties[1].color"
        :transform="`translate(${properties[1].translateX} ${properties[1].translateY}) rotate(${properties[1].rotate} ${SIZE / 2} ${SIZE / 2}) scale(${properties[2].scale})`"
      />
      <path
        :filter="`url(#filter_${maskID})`"
        style="mix-blend-mode: overlay"
        d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
        :fill="properties[2].color"
        :transform="`translate(${properties[2].translateX} ${properties[2].translateY}) rotate(${properties[2].rotate} ${SIZE / 2} ${SIZE / 2}) scale(${properties[2].scale})`"
      />
    </g>
    <defs>
      <filter
        :id="`filter_${maskID}`"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur" />
      </filter>
    </defs>
  </svg>
</template>
