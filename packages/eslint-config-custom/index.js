module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/display-name': 'off',
    'import/no-anonymous-default-export': 'off',
  },
};
