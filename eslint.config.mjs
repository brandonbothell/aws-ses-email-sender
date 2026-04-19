// @ts-check

import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  globalIgnores([
    'attachments/**/*',
    'distribution/**/*',
    'node_modules/**/*',
    '.yarn/**/*',
    '.pnp.*',
  ]),
  js.configs.recommended,
  tseslint.configs.recommended,
  stylistic.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/object-curly-newline': ['error', {
        consistent: true,
        multiline: true,
      }],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    },
  },
])
