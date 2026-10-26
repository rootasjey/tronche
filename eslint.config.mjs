import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({}, {
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-object-type': 'off',
    'import/first': 'off',
    'no-constant-binary-expression': 'off',
    'vue/multi-word-component-names': 'off',
  },
})
