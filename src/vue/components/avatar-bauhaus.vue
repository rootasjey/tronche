<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { generateBauhausData } from 'tronche';

const DESIGN_SIZE = 80;

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
const data = computed(() => generateBauhausData(props.name, props.colors));
const displaySize = computed(() => Number(props.size));
const mid = computed(() => DESIGN_SIZE / 2);
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
    <mask :id="data.maskId" maskUnits="userSpaceOnUse" x="0" y="0" :width="DESIGN_SIZE" :height="DESIGN_SIZE">
      <rect :width="DESIGN_SIZE" :height="DESIGN_SIZE" :rx="props.square ? undefined : DESIGN_SIZE * 2" fill="#FFFFFF" />
    </mask>
    <g :mask="`url(#${data.maskId})`">
      <rect :width="DESIGN_SIZE" :height="DESIGN_SIZE" :fill="data.elements[0].color" />
      <rect
        :x="(DESIGN_SIZE - 60) / 2"
        :y="(DESIGN_SIZE - 20) / 2"
        :width="DESIGN_SIZE"
        :height="data.elements[1].isSquare ? DESIGN_SIZE : DESIGN_SIZE / 8"
        :fill="data.elements[1].color"
        :transform="`translate(${data.elements[1].translateX} ${data.elements[1].translateY}) rotate(${data.elements[1].rotate} ${mid} ${mid})`"
      />
      <circle
        :cx="mid"
        :cy="mid"
        :fill="data.elements[2].color"
        :r="DESIGN_SIZE / 5"
        :transform="`translate(${data.elements[2].translateX} ${data.elements[2].translateY})`"
      />
      <line
        x1="0"
        :y1="mid"
        :x2="DESIGN_SIZE"
        :y2="mid"
        stroke-width="2"
        :stroke="data.elements[3].color"
        :transform="`translate(${data.elements[3].translateX} ${data.elements[3].translateY}) rotate(${data.elements[3].rotate} ${mid} ${mid})`"
      />
    </g>
  </svg>
</template>
