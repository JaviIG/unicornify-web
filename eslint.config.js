import eslintConfigPrettier from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/.nuxt',
      '**/.netlify',
      '**/node_modules',
      '**/.output',
      '**/dist',
      '**/storybook-static',
      '**/playwright-report',
      '**/.wrangler',
      '**/.idea',
    ],
  },
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    files: ['**/*.{js,vue,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/v-slot-style': 'off',
      'vue/attributes-order': [
        'warn',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'TWO_WAY_BINDING',
            'UNIQUE',
            'EVENTS',
            'SLOT',
            'CONTENT',
          ],
          alphabetical: false,
        },
      ],
      'no-console': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['packages/gleam-ui-snapshots/e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    ...playwright.configs['flat/recommended'],
  },
];
