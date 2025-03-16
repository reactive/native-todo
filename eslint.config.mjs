import anansiPlugin from '@anansi/eslint-plugin';

export default [
  ...anansiPlugin.configs.typescript,
  {
    ignores: [
      '**/lib*/*',
      '**/dist*/*',
      '**/node_modules*/*',
      'node_modules/*',
    ],
  },
];
