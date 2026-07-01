<template>
  <div class="avatars-grid">
    <slot />
  </div>
</template>

<style scoped>
.avatars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: var(--sp-l);
  padding: var(--pagePadding);
}
</style>
