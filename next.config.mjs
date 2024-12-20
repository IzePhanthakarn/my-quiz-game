/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	basePath: process.env.NEXT_PUBLIC_BASE_PATH,
	assetPrefix: "/med/",
	trailingSlash: true,
};

export default nextConfig;
