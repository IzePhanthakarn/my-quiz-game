/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	basePath: "/med",
	assetPrefix: "/med/",
	publicRuntimeConfig: {
		basePath: "/med",
	},
};

export default nextConfig;
