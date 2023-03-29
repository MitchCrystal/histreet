module.exports = {
  reactStrictMode: true,
  transpilePackages: ['shared-components'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**/**',
      },
    ],
  },
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
