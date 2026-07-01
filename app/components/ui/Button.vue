<template>
  <button class="button" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
.button {
  padding: var(--textbox);
  font: inherit;
  color: inherit;
  border: 1px solid transparent;
  transition: 0.5s;
  border-radius: 100rem;
  background: transparent;
  cursor: pointer;
}

.button:hover {
  border-color: var(--c-fieldHover);
  transition: 0.2s;
}

.button:focus {
  border-color: var(--c-fieldFocus);
  outline: none;
}
</style>
