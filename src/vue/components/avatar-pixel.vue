<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { generatePixelData } from 'tronche';

const DESIGN_SIZE = 80;
const GRID = 8;

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
  size: 80,
});

const attrs = useAttrs();
const data = computed(() => generatePixelData(props.name, props.colors));
const displaySize = computed(() => Number(props.size));
const cellSize = computed(() => DESIGN_SIZE / GRID);
</script>

<template>
  <svg
    :viewBox="`0 0 ${DESIGN_SIZE} ${DESIGN_SIZE}`"
    fill="none"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    :width="displaySize"
    :height="displaySize"
    v-bind="attrs"
  >
    <title v-if="props.title">{{ props.name }}</title>
    <mask
      :id="data.maskId"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      :width="DESIGN_SIZE"
      :height="DESIGN_SIZE"
    >
      <rect :width="DESIGN_SIZE" :height="DESIGN_SIZE" :rx="props.square ? undefined : DESIGN_SIZE * 2" fill="#FFFFFF" />
    </mask>
    <g :mask="`url(#${data.maskId})`">
      <rect v-for="(color, index) in data.colors" :key="index"
            :x="(index % GRID) * cellSize" :y="Math.floor(index / GRID) * cellSize"
            :width="cellSize" :height="cellSize" :fill="color" />
    </g>
  </svg>
</template>
