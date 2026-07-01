<template>
  <div class="segment-group">
    <slot />
  </div>
</template>

<style scoped>
.segment-group {
  display: flex;
  border: 1px solid var(--c-fieldHover);
  border-radius: 100rem;
  overflow: hidden;
}
</style>
