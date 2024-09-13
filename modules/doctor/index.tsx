"use client";

import React, { useEffect } from "react";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
	setDoctorFilter,
	setDoctorForm,
	setOrder,
	setPagination,
} from "./redux";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { LINKS } from "@/constants/links";
import { useRouter } from "next/navigation";
import { initDoctorGrid } from "./service";
import { modelDoctorFilter } from "./redux/filter/model";
import { GetColumns } from "./model";
import FilterDrawer from "./FilterDrawer";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { handleSession } from "@/components/MedDropDown/service";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";
// import HeaderLayout from "wcf-component-lib/src/layout/HeaderLayout";
import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { modelDoctorForm } from "./redux/form/model";

export default function Doctor() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { rows, isOpen, page, filter, isLoading } = useSelector(
		(state: SliceModel) => ({
			rows: state.doctor.grid.list,
			isOpen: state.drawer.isOpen,
			page: state.doctor.grid.page,
			filter: state.doctor.doctorFilter,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	const [init, setInit] = React.useState(false);

	const { dispatchLayout } = useLayout();

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<FilterLayout
					FilterForm={
						<div className="flex space-x-2">
							<BaseItemInput
								// notForm
								itemName="doctorCodeLike"
								label="รหัสแพทย์ / เลขที่ สปส"
								// value={filter.doctorCodeLike}
								onChangeFunction={(e) => {
									dispatch(
										setDoctorFilter({
											...filter,
											doctorCodeLike: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								notForm
								label="ชื่อ"
								value={filter.firstnameLike}
								onChangeFunction={(e) => {
									dispatch(
										setDoctorFilter({
											...filter,
											firstnameLike: e.target.value,
										})
									);
								}}
							/>
							<BaseItemInput
								notForm
								label="นามสกุล"
								value={filter.lastnameLike}
								onChangeFunction={(e) => {
									dispatch(
										setDoctorFilter({
											...filter,
											lastnameLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					}
					handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
					handleSubmitSearch={() => {
						dispatch(
							initDoctorGrid({
								pagination: { ...page },
								...filter,
							})
						);
					}}
				/>
			),
		});
	}, [dispatchLayout]);

	useEffect(() => {
		dispatch(handleSession(SESSION_NAME.ADDRESS));
		dispatch(handleSession(SESSION_NAME.DIPLOMA));
		dispatch(handleSession(SESSION_NAME.HOSPITAL));
		dispatch(setDoctorForm(modelDoctorForm));
	}, []);

	useEffect(() => {
		if (!init) {
			dispatch(setDoctorFilter(modelDoctorFilter));
			setInit(true);
		}
		dispatch(
			initDoctorGrid({
				pagination: { ...page },
				...filter,
			})
		);
	}, [page.pageNumber, page.pageSize, page.orders]);

	return (
		<div>
			<FilterLayout
				FilterForm={
					<div className="flex space-x-2">
						<BaseItemInput
							notForm
							label="รหัสแพทย์ / เลขที่ สปส"
							value={filter.doctorCodeLike}
							onChangeFunction={(e) => {
								dispatch(
									setDoctorFilter({
										...filter,
										doctorCodeLike: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							notForm
							label="ชื่อ"
							value={filter.firstnameLike}
							onChangeFunction={(e) => {
								dispatch(
									setDoctorFilter({
										...filter,
										firstnameLike: e.target.value,
									})
								);
							}}
						/>
						<BaseItemInput
							notForm
							label="นามสกุล"
							value={filter.lastnameLike}
							onChangeFunction={(e) => {
								dispatch(
									setDoctorFilter({
										...filter,
										lastnameLike: e.target.value,
									})
								);
							}}
						/>
					</div>
				}
				handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
				handleSubmitSearch={() => {
					dispatch(
						initDoctorGrid({
							pagination: { ...page },
							...filter,
						})
					);
				}}
			/>
			<MasterDataLayout
				Grid={
					<BaseGrid
						rows={rows}
						loading={isLoading}
						columns={GetColumns(router)}
						page={page}
						twoToneColor={true}
						setOrder={(e) => dispatch(setOrder(e))}
						setPagination={(page) => dispatch(setPagination(page))}
					/>
				}
				Drawer={
					<BaseDrawer
						isOpen={isOpen}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						content={<FilterDrawer />}
						isFilter
						confirmFuntion={() =>
							dispatch(
								initDoctorGrid({
									pagination: { ...page },
									...filter,
								})
							)
						}
						clearFilter={() => dispatch(setDoctorFilter(modelDoctorFilter))}
					/>
				}
				AddFunction={() => router.push(LINKS.DOCTOR.add)}
				AddLabel="สร้างแพทย์"
				TotalItems={page.totalData}
			/>
		</div>
	);
}
