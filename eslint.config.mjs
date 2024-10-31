import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonarjsPlugin from 'eslint-plugin-sonarjs';

/**
 * Why no prettier in the lint configuration?
 * https://typescript-eslint.io/users/what-about-formatting/#suggested-usage---prettier
 */

export const defaultConfig = [
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    // ignores: [
    //   './test/fixtures/**/*',
    // ],
    files: [
      'src/**/*.ts',
      'test/**/*.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  },
  {
    files: [
      'test/**/*.ts',
    ],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  sonarjsPlugin.configs.recommended,
  {
    plugins: {
      sonarjsPlugin: sonarjsPlugin,
    },
    rules: {
      // Some class names break with SonarJS recommendations but are probably
      // readable just the way they are. QW_ACT_R7 and the like.
      'sonarjs/class-name': 'off',
    }
  }
];

export default tseslint.config(defaultConfig);
