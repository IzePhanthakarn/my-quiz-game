"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { useRouter } from "next/navigation";
import { EstimateAddGrid } from "../../columns/estimateAddGrid";
import { LINKS } from "../../../../constants/links";
import FilterLayout from "wcf-component-lib/src/layout/FilterLayout";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { EstimateAddFilter } from "../../redux/models/hospitalModel";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import MasterDataLayout from "wcf-component-lib/src/layout/MasterDataLayout";
import { estimateAddNames } from "../../interfaces/estimateAddNames";
import BaseItemDatePicker from "wcf-component-lib/src/components/BaseItemDatePicker";
import BaseItemDateRangePicker from "wcf-component-lib/src/components/BaseItemDateRangePicker";

export default function EstimateAdd() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { estimateAdd, isLoading, filter } = useSelector(
		(state: SliceModel) => ({
			estimateAdd: state.hospital.estimateAdd,
			filter: state.hospital.estimateAdd.filter,

			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	useEffect(() => {}, []);

	const [form] = Form.useForm();
	const [formDrawer] = Form.useForm();

	const onFinish: FormProps<EstimateAddFilter>["onFinish"] = (
		value: EstimateAddFilter
	) => {
		// const newFilter = { ...filter, ...value };
		// dispatch(
		// 	initDoctorGrid({
		// 		pagination: { ...page },
		// 		...newFilter,
		// 	})
		// );
		// dispatch(setMounted(uuid4()));
		// dispatch(setDoctorFilter(newFilter));
	};

	return (
		<div>
			<MasterDataLayout
				Grid={
					<BaseGrid
						rows={estimateAdd.grid.data}
						columns={EstimateAddGrid(router)}
						page={estimateAdd.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {}}
					/>
				}
				AddButton={<div></div>}
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
										itemName={estimateAddNames.hospitalName}
										label="สถานพยาบาล"
										onPressEnter={() => form.submit()}
									/>
									<BaseItemInput
										itemName={estimateAddNames.name}
										label="ชื่อ"
										onPressEnter={() => form.submit()}
									/>
									<BaseItemInput
										itemName={estimateAddNames.lastName}
										label="สกุล"
										onPressEnter={() => form.submit()}
									/>

									{/* <BaseItemInput
										itemName="reportDateFrom"
										label="วันที่แจ้ง"
										onPressEnter={() => form.submit()}
									/> */}
									{/* <BaseItemDatePicker
										itemName="reportDateFrom"
										label="วันที่แจ้ง"
										itemForm={form}
									/> */}

									{/* <BaseItemInput
										itemName="reportDateTo"
										label="ถึงวันที่"
										onPressEnter={() => form.submit()}
									/> */}
									{/* <BaseItemDatePicker
										itemName="reportDateTo"
										label="ถึงวันที่"
										itemForm={form}
									/> */}

									<BaseItemDateRangePicker
										itemName="reportDateTo"
										label="วันที่แจ้ง"
									/>
								</div>
							</BaseForm>
						}
						// handleUniqueDrawer={() => dispatch(setIsOpenDrawer(true))}
						handleSubmitSearch={() => {
							form.submit();
						}}
					/>
				}
				Drawer={<></>}
				AddFunction={() => router.push(LINKS.DOCTOR.add)}
				AddLabel="สร้าง"
				TotalItems={estimateAdd.grid.page.totalData}
			/>
		</div>
	);
}
