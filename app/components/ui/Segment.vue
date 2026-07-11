<template>
  <button 
    class="segment" 
    :class="{ 'is-selected': isSelected }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  isSelected?: boolean;
}

defineProps<Props>();
defineEmits(['click']);
</script>

<style scoped>
.segment {
  padding: var(--textbox);
  font: inherit;
  color: inherit;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: 0.2s;
  text-transform: capitalize;
}

.segment:hover {
  background: var(--c-fieldHover);
}

.segment.is-selected {
  background: var(--c-body);
  color: var(--c-background);
}
</style>
