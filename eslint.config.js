import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: true,
  ignores: [
    'dist',
    '.output',
    '.nuxt',
  ],
  rules: {
    'no-console': 'off',
    'vue/no-multiple-template-root': 'off',
    'node/prefer-global/process': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
