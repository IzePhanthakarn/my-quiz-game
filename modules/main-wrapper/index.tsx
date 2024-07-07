"use client";

import { ReactNode } from "react";
import axios from "axios";
import { AppDispatch } from "@/redux/config/configStore";
// import { useDispatch } from "react-redux";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import Row from "@/components/Row";
import Loading from "@/components/Loading";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { sidebarWidth } from "@/constants/global";
import { cn } from "@/utils/libs/client";
import { SliceModel } from "../../redux/slices/model";
import { setIsLoading } from "../../components/Loading/redux";
import BaseBreadCrumb from "wcf-component-lib/src/components/BaseBreadCrumb";
import { usePathname } from "next/navigation";
import { pathMapping } from "@/constants/path-mapping";

type Props = {
	children: ReactNode;
};

const MainWrapper: React.FC<Props> = (props) => {
	const pathname = usePathname();
	const dispatch: AppDispatch = useDispatch();
	const { isLoading } = useSelector(
		(state: SliceModel) => ({
			isLoading: state.loading.isLoading,
		}),
		shallowEqual
	);

	axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
	axios.interceptors.request.use(
		(config) => {
			dispatch(setIsLoading(true));
			config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_MOCK_TOKEN}`;
			return config;
		},
		(error) => {
			dispatch(setIsLoading(false));
			return Promise.reject(error);
		}
	);
	axios.interceptors.response.use(
		(response) => {
			dispatch(setIsLoading(false));
			return response;
		},
		(error) => {
			dispatch(setIsLoading(false));
			// if (error.response && error.response.status === 401) {
			// }
			return Promise.reject(error);
		}
	);

	return (
		<>
			{isLoading && <Loading />}
			{/* <HandleErrorDialog /> */}
			<NavBar />
			<Row className="h-[calc(100vh-75px)]">
				<SideBar />
				<main
					className={cn(
						`p-4 bg-[#FAFAFA]`,
						sidebarWidth && `w-[calc(100vw-280px)] relative`
					)}
				>
					<BaseBreadCrumb pathName={pathname} pathMapping={pathMapping} />
					{props.children}
				</main>
			</Row>
		</>
	);
};
export default MainWrapper;
