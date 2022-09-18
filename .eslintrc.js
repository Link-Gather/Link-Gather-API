module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base', // includes plugin: import
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended', // includes plugin: jest
    'plugin:jest/style',
    'plugin:prettier/recommended', // includes plugin: prettier
  ],
  env: {
    node: true,
    'jest/globals': true,
  },
  rules: {
    'prettier/prettier': 'error',
    'global-require': 'off',
    'no-bitwise': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-return-await': 'off',
    'no-multi-assign': 'off',
    'no-unused-expressions': 'off',
    'no-throw-literal': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-continue': 'off',
    'guard-for-in': 'off',
    'no-loop-func': 'off',
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'import/no-dynamic-require': 'off',
    'import/order': ['error', { 'newlines-between': 'never' }],
    'import/prefer-default-export': 'off',
    curly: ['error', 'all'], // prettier에 의해 비활성화됨. 무조건 다시 활성화 해야함.

    /**
     * For DDD
     */
    'max-classes-per-file': 'off',

    /**
     * For test files
     */
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.*spec.*s', '**/*.*test.*s'] },
    ],

    /**
     * Overridden in `typescript.js` rules
     */
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true,
      },
    ],
  },
  settings: {
    'prettier/prettier': 'error',
  },
};
