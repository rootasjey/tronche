<template>
  <div></div>
</template>

<script setup>
// This component provides global CSS variables and base styles
</script>

<style>
:root {
  --pagePadding: 2rem;
  --sp-xs: 0.25rem;
  --sp-s: 0.5rem;
  --sp-m: 1rem;
  --sp-l: 2rem;
  --textbox: 0.75rem 1rem;
  
  --c-body: #1a1a1a;
  --c-background: #ffffff;
  --c-fieldHover: #e0e0e0;
  --c-fieldFocus: #007acc;
  --c-fade: #666666;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--c-background);
  color: var(--c-body);
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
