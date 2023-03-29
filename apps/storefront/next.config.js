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
        destination: 'https://histreet-admin.vercel.app',
        permanent: true,
        basePath: false,
      },
    ];
  },
};
