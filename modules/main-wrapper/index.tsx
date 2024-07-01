"use client";

import { ReactNode } from "react";
import axios from "axios";
import { AppDispatch } from "@/redux/config/configStore";
// import { useDispatch } from "react-redux";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";

type Props = {
	children: ReactNode;
};

const MainWrapper: React.FC<Props> = (props) => {
	// const dispatch: AppDispatch = useDispatch();

	axios.interceptors.request.use(
		(config) => {
			// const dispatch: AppDispatch = useDispatch();
			// dispatch(setIsOpenDrawer(true));

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
