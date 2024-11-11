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
import { DoctorFilter, modelDoctorFilter } from "./redux/filter/model";
import { GetColumns } from "./model";
import FilterDrawer from "./FilterDrawer";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { handleSession } from "@/components/MedDropDown/service";
import { SESSION_NAME } from "@/components/MedDropDown/model";

import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import { modelDoctorForm } from "./redux/form/model";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import uuid4 from "uuid4";
import { setMounted } from "@/redux/slices/container";
import _ from "lodash";

export default function Doctor() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { rows, isOpen, page, filter, isLoading, mounted } = useSelector(
		(state: SliceModel) => ({
			rows: state.doctor.grid.list,
			isOpen: state.drawer.isOpen,
			page: state.doctor.grid.page,
			filter: state.doctor.doctorFilter,
			isLoading: state.container.isLoading,
			mounted: state.container.mounted,
		}),
		shallowEqual
	);

	const [init, setInit] = React.useState(false);

	const [form] = Form.useForm();
	const [formDrawer] = Form.useForm();

	const onFinishDrawer: FormProps<DoctorFilter>["onFinish"] = (
		value: DoctorFilter
	) => {
		const quickFilter = form.getFieldsValue();
		let handleHospital;
		let newFilter = { ...filter, ...value };
		let handleFilter = {
			...newFilter,
			...quickFilter,
		};
		if (
			!_.isEmpty(value.hospitalNameLike) &&
			!_.isNil(value.hospitalNameLike)
		) {
			handleHospital = value.hospitalNameLike.split("-")[0];
			handleFilter = {
				...newFilter,
				hospitalNameLike: handleHospital,
			};
		}
		dispatch(
			initDoctorGrid({
				pagination: { ...page },
				...handleFilter,
			})
		);
		dispatch(setDoctorFilter(newFilter));
	};

	const onFinish: FormProps<DoctorFilter>["onFinish"] = (
		value: DoctorFilter
	) => {
		const newFilter = { ...filter, ...value };
		dispatch(
			initDoctorGrid({
				pagination: { ...page },
				...newFilter,
			})
		);
		dispatch(setMounted(uuid4()));
		// dispatch(setDoctorFilter(newFilter));
	};

	// useEffect(() => {
	// 	dispatchLayout({
	// 		type: "setChildrenHeader",
	// 		payload: (
	// 			<FilterLayout
	// 				FilterForm={
	// 					<BaseForm
	// 						initialValues={filter}
	// 						extraForm={form}
	// 						onFinish={onFinish}
	// 					>
	// 						<div className="flex space-x-2">
	// 							<BaseItemInput
	// 								itemName="doctorCodeLike"
	// 								label="เลขทะเบียน สปส"
	// 								onPressEnter={() => form.submit()}
	// 							/>
	// 							<BaseItemInput
	// 								label="ชื่อ"
	// 								itemName="firstnameLike"
	// 								onPressEnter={() => form.submit()}
	// 							/>
	// 							<BaseItemInput
	// 								label="นามสกุล"
	// 								itemName="lastnameLike"
	// 								onPressEnter={() => form.submit()}
	// 							/>
	// 						</div>
	// 					</BaseForm>
	// 				}
	// 				handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
	// 				handleSubmitSearch={() => {
	// 					form.submit();
	// 				}}
	// 			/>
	// 		),
	// 	});
	// }, []);

	useEffect(() => {
		dispatch(handleSession(SESSION_NAME.TITLE));
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
			<MasterDataLayout
				Grid={
					<BaseGrid
						rows={rows}
						loading={isLoading}
						columns={GetColumns({ mounted, router })}
						page={page}
						twoToneColor={true}
						setOrder={(e) => dispatch(setOrder(e))}
						setPagination={(page) => dispatch(setPagination(page))}
					/>
				}
				FilterLayout={
					<FilterLayout
						FilterForm={
							<BaseForm
								initialValues={filter}
								extraForm={form}
								onFinish={onFinish}
							>
								<div className="flex space-x-2">
									<BaseItemInput
										itemName="doctorCodeLike"
										label="เลขทะเบียน สปส"
										onPressEnter={() => form.submit()}
									/>
									<BaseItemInput
										label="ชื่อ"
										itemName="firstnameLike"
										onPressEnter={() => form.submit()}
									/>
									<BaseItemInput
										label="นามสกุล"
										itemName="lastnameLike"
										onPressEnter={() => form.submit()}
									/>
								</div>
							</BaseForm>
						}
						handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							form.submit();
						}}
					/>
				}
				Drawer={
					<BaseDrawer
						isOpen={isOpen}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						content={
							<FilterDrawer
								form={formDrawer}
								onFinish={onFinishDrawer}
								filter={filter}
							/>
						}
						isFilter
						confirmFuntion={() => formDrawer.submit()}
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
