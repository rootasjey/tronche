export const snippets: Record<string, string> = {
  'npm-install': 'npm install tronche',
  'nuxt-config': [
    'export default defineNuxtConfig({',
    "  modules: ['tronche/module'],",
    '})',
  ].join('\n'),
  'nuxt-template': [
    '<template>',
    '  <Avatar name="Maria Mitchell" variant="beam" />',
    '</template>',
  ].join('\n'),
  'vue-import': [
    '<script setup>',
    "import Avatar from 'tronche/src/runtime/components/Avatar.vue'",
    '</script>',
    '',
    '<template>',
    '  <Avatar name="Grace Hopper" :colors="[',
    "    '#fb6900',",
    "    '#f63700',",
    "    '#004853',",
    '  ]" />',
    '</template>',
  ].join('\n'),
  'curl-example': 'curl "https://tronche.app/api/avatar/Clara%20Barton?variant=beam"',
  'curl-colors': 'curl "https://tronche.app/api/avatar/test?size=200&square=true&colors=FF6B6B,4ECDC4,45B7D1"',
  'home-nuxt': [
    '<template>',
    '  <Avatar name="Maria Mitchell" variant="beam" />',
    '</template>',
  ].join('\n'),
}
