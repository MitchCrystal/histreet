module.exports = {
  reactStrictMode: true,
  transpilePackages: ['shared-components'],
  async redirects() {
    return [
      {
        source: '/',
        destination: 'http://localhost:3001',
        permanent: true,
        basePath: false,
      },
    ];
  },
};
