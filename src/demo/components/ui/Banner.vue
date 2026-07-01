<template>
  <div class="banner">
    <slot />
  </div>
</template>

<style scoped>
.banner {
  background: var(--c-body);
  color: var(--c-background);
  padding: var(--sp-l);
}
</style>
