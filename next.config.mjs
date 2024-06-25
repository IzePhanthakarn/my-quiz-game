/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
		// webpack(config, { isServer }) {
		// 	// Modify the webpack config to use less-loader
		// 	config.module.rules.push({
		// 		test: /\.less$/,
		// 		use: [
		// 			'style-loader',
		// 			'css-loader',
		// 			{
		// 				loader: 'less-loader',
		// 				options: {
		// 					lessOptions: {
		// 						javascriptEnabled: true,
		// 						modifyVars: {
		// 							// Customize Ant Design theme variables here
		// 							'@font-family': "'Helvethaica', sans-serif", // Custom font family
		// 						},
		// 					},
		// 				},
		// 			},
		// 		],
		// 	});
		// 	return config;
		// },
};

export default nextConfig;


