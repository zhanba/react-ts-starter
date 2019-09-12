/** @format */

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint'],
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
}
