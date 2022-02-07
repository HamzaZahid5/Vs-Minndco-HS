module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint'],
  extends: [
    '@react-native-community',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    strict: 0,
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'import/no-extraneous-dependencies': 'off',
    // no-prototype-builtins: off,
    'no-nested-ternary': 'off',
    camelcase: 0,
    'no-console': 2,
    'object-curly-spacing': 'off',
    '@typescript-eslint/ban-ts-comment': [2, { 'ts-ignore': 'allow-with-description', minimumDescriptionLength: 3 }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': ['error', { semi: false }],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
