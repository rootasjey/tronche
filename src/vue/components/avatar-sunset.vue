<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { generateSunsetData } from '../../lib/generators/sunset';

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
const data = computed(() => generateSunsetData(props.name, props.colors));
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
      <path :fill="`url(#gradient0_${data.nameWithoutSpace})`" :d="`M0 0h${DESIGN_SIZE}v${mid}H0z`" />
      <path :fill="`url(#gradient1_${data.nameWithoutSpace})`" :d="`M0 ${mid}h${DESIGN_SIZE}v${mid}H0z`" />
    </g>
    <defs>
      <linearGradient
        :id="`gradient0_${data.nameWithoutSpace}`"
        :x1="mid"
        y1="0"
        :x2="mid"
        :y2="mid"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="data.colors[0]" />
        <stop offset="1" :stop-color="data.colors[1]" />
      </linearGradient>
      <linearGradient
        :id="`gradient1_${data.nameWithoutSpace}`"
        :x1="mid"
        :y1="mid"
        :x2="mid"
        :y2="DESIGN_SIZE"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="data.colors[2]" />
        <stop offset="1" :stop-color="data.colors[3]" />
      </linearGradient>
    </defs>
  </svg>
</template>
