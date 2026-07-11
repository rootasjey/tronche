<template>
  <button 
    class="color-dot" 
    :style="{ backgroundColor: value }"
    @click="handleClick"
  >
  </button>
</template>

<script setup lang="ts">
interface Props {
  value: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['change']);

const handleClick = () => {
  // For now, just emit the same color
  // In a full implementation, this would open a color picker
  emit('change', props.value);
};
</script>

<style scoped>
.color-dot {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid var(--c-fieldHover);
  cursor: pointer;
  transition: 0.2s;
}

.color-dot:hover {
  transform: scale(1.1);
  border-color: var(--c-fieldFocus);
}
</style>
