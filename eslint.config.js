import typescriptParser from '@typescript-eslint/parser';

// Plugins
import tsEslint from '@typescript-eslint/eslint-plugin';
import sonarjs from 'eslint-plugin-sonarjs';
import prettier from 'eslint-plugin-prettier';

// Configs to extend from
import eslintRecommendedConfig from 'eslint/conf';


export default [
  {
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      tsEslint,
      sonarjs,
      prettier,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:sonarjs/recommended",
      "prettier",
    ],
    rules: {
      "prettier/prettier": 2,
    },
    files: [
      "**/*.ts",
      "scripts/**/*.ts"
    ]
  }
]
