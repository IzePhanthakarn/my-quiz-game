"use client";

import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SliceModel } from "../../redux/slices/model";
import { setIsLoading } from "../../redux/slices/container";
import BaseLoading from "wcf-component-lib/src/components/BaseLoading";
import BaseDialog from "wcf-component-lib/src/components/BaseDialog";
import _ from "lodash";
import Cookies from "js-cookie";
import BaseRow from "wcf-component-lib/src/components/BaseRow";
import { BaseToastNotificationType } from "wcf-component-lib/src/constants/base-toast-notification";
import BaseToastNotification from "wcf-component-lib/src/components/BaseToastNotification";
import { setIsOpenDialog } from "@/redux/slices/dialog";
import HeaderNavbarLayout from "wcf-component-lib/src/layout/HeaderNavbarLayout/";
import { LayoutProvider } from "wcf-component-lib/src/provider/LayoutProvider";
import { configPage } from "@/constants/config-page";

type Props = {
	children: ReactNode;
};

const MainWrapper: React.FC<Props> = (props) => {
	const dispatch: AppDispatch = useDispatch();
	const { isLoading, dialog } = useSelector(
		(state: SliceModel) => ({
			isLoading: state.container.isLoading,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL_MED;

	axios.interceptors.request.use(
		(config) => {
			dispatch(setIsLoading(true));
			config.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
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
				BaseToastNotification({
					message: err.response.data.title,
					type: BaseToastNotificationType.ERROR,
					description: err.response.data.detail,
					duration: 0,
				});
			});
		}
	);

	return (
		<LayoutProvider
			configPage={configPage}
			// urlApi={`${process.env.NEXT_PUBLIC_PAGE_ACCESSES_PATH}/${userName}/page-accesses`}
			urlApi={`${process.env.NEXT_PUBLIC_PAGE_ACCESSES_PATH}/sjittikhun2/page-accesses`}
		>
			<HeaderNavbarLayout>
				<BaseRow className="h-full">
					<main className={`py-2 px-4 h-fit bg-[#E7ECF2] w-full relative`}>
						{props.children}
					</main>
				</BaseRow>
				{isLoading && <BaseLoading />}
				<BaseDialog
					isOverFlow={dialog.isOverFlow}
					width={dialog.width}
					isOpen={dialog.isOpen}
					setIsOpen={() => dispatch(setIsOpenDialog(false))}
					content={dialog.content}
					headerText={dialog.headerText}
					uniqueContent={dialog.uniqueContent}
					onConfirm={dialog.onConfirm}
					onCancel={dialog.onCancel}
					labelConfirm={dialog.labelConfirm}
					showCancel={dialog.showCancel}
					baseDialogType={dialog.baseDialogType}
					themeIcon={dialog.themeIcon}
					maxHeight={dialog.maxHeight}
					maxWidth={dialog.maxWidth}
				/>
			</HeaderNavbarLayout>
		</LayoutProvider>
	);
};
export default MainWrapper;
