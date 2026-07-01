<template>
  <div class="colors-section">
    <slot />
  </div>
</template>

<style scoped>
.colors-section {
  display: flex;
  gap: var(--sp-s);
  align-items: center;
}
</style>
