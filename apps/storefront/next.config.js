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
};
