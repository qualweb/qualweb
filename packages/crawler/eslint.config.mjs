import tseslint from 'typescript-eslint';
import { defaultConfig } from '../../eslint.config.mjs';

// Re-use the base configuration in the root of the monorepo.
export default tseslint.config(... defaultConfig);
