module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module' //  这个一定要加！！ react 不需要必须使用jsx ,加上它可以是写react16以上版本hook写法
  },
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': ['off']
  }
};
