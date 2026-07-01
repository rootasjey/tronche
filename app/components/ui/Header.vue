<template>
  <header class="header">
    <slot />
  </header>
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto auto;
  padding: var(--pagePadding);
  align-items: center;
  grid-gap: var(--sp-s);
}
</style>
