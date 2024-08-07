"use client";

import { ReactNode, useState } from "react";
import axios from "axios";
import { AppDispatch } from "@/redux/config/configStore";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { sidebarWidth } from "@/constants/global";
import { cn } from "@/utils/libs/client";
import { SliceModel } from "../../redux/slices/model";
import { setIsLoading } from "../../components/Loading/redux";
import BaseLoading from "wcf-component-lib/src/components/BaseLoading";
import BaseDialog from "wcf-component-lib/src/components/BaseDialog";
import _ from "lodash";
import Cookies from "js-cookie";
import BaseRow from "wcf-component-lib/src/components/BaseRow";
import { BaseToastNotificationType } from "wcf-component-lib/src/constants/base-toast-notification";
import { baseToastNotification } from "wcf-component-lib/src/components/BaseToastNotification";
type Props = {
	children: ReactNode;
};

const MainWrapper: React.FC<Props> = (props) => {
	// const pathname = usePathname();
	const dispatch: AppDispatch = useDispatch();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [textDetail, setTextDetail] = useState<string>("");
	const [textHeader, setTextHeader] = useState<string>("");

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
			config.headers.Authorization = `Bearer ${Cookies.get("Bearer")}`;
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
			return Promise.reject(error).then(null, (err) => {
				baseToastNotification({
					message: err.response.data.title,
					type: BaseToastNotificationType.ERROR,
					description: err.response.data.detail,
					duration: 0,
				});
			});
		}
	);

	return (
		<div className="h-screen">
			<NavBar />
			<BaseRow className="h-full">
				<SideBar />
				<main
					className={cn(
						`p-4 pt-0 bg-[#E7ECF2]`,
						sidebarWidth && `w-full relative`
					)}
				>
					{/* Bread Crumb */}
					{/* <BaseBreadCrumb pathName={pathname} pathMapping={pathMapping} /> */}
					{props.children}
				</main>
			</BaseRow>
			{/* Loading */}
			{isLoading && <BaseLoading />}
			{/* Dialog */}
			<BaseDialog
				isOpen={isOpen}
				setIsOpen={(value) => setIsOpen(value)}
				content={<p>{textDetail}</p>}
				headerText={<p>{textHeader}</p>}
			/>
		</div>
	);
};
export default MainWrapper;
