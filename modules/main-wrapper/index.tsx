"use client";

import { ReactNode } from "react";
import axios from "axios";

type Props = { children: ReactNode };

const MainWrapper: React.FC<Props> = (props) => {
	// const dispatch: AppDispatch = useDispatch();
	axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

	axios.interceptors.request.use(
		(config) => {
			// const dispatch: AppDispatch = useDispatch();
			// dispatch(setIsOpenDrawer(true));
			config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_MOCK_TOKEN}`;
			console.log("🚀 ~ axiosInstance.interceptors.request config:", config);
			return config;
		},
		(error) => {
			console.log("🚀 ~ axiosInstance.interceptors.request error:", error);
			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
		(response) => {
			console.log("🚀 ~ axiosInstance.interceptors.response:", response);
			return response;
		},
		(error) => {
			console.log("🚀 ~ axiosInstance.interceptors.error:", error);
			// if (error.response && error.response.status === 401) {
			// }
			return Promise.reject(error);
		}
	);

	return <>{props.children}</>;
};
export default MainWrapper;
