<template>
  <button 
    class="size-dot" 
    :class="{ 'is-selected': isSelected }"
    @click="$emit('click')"
  >
    <div 
      class="dot" 
      :style="{ width: `${Math.min(size / 4, 20)}px`, height: `${Math.min(size / 4, 20)}px` }"
    ></div>
  </button>
</template>

<script setup>
interface Props {
  size: number;
  isSelected?: boolean;
}

defineProps<Props>();
defineEmits(['click']);
</script>

<style scoped>
.size-dot {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--c-fieldHover);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.size-dot:hover {
  border-color: var(--c-fieldFocus);
}

.size-dot.is-selected {
  border-color: var(--c-body);
  background: var(--c-body);
}

.dot {
  background: var(--c-body);
  border-radius: 50%;
  transition: 0.2s;
}

.size-dot.is-selected .dot {
  background: var(--c-background);
}
</style>
