// Runs the Style Dictionary build defined in `style-dictionary.config.mjs`.
import StyleDictionary from 'style-dictionary';
import config from '../style-dictionary.config.mjs';

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
console.log('✔ Design tokens built (SCSS -> projects/design-system/src/styles/tokens, TS -> projects/design-system/src/lib/tokens)');
