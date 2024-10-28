import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setHospitalFilter } from "./redux";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { names } from "./interfaces/names";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import BaseItemDateRangePicker from "wcf-component-lib/src/components/BaseItemDateRangePicker";
import dayjs from "dayjs";
// import { HospitalFilter } from "./redux/models/hospitalModel";
// import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.hospital.filter,
		}),
		shallowEqual
	);

	return (
		<BaseForm initialValues={filter}>
			<BaseColumn className="space-y-4">
				<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckbox
						itemName="CheckHospitalWcfCode"
						label={names.hospitalWcfCode}
						checked={filter.CheckHospitalWcfCode}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setHospitalFilter({
									...filter,
									CheckHospitalWcfCode: !filter.CheckHospitalWcfCode,
								})
							)
						}
					/>
					{filter.CheckHospitalWcfCode && (
						<div className=" pt-1">
							<BaseItemInput
								itemName="hospitalWcfCodeLike"
								value={`${filter.hospitalWcfCodeLike}`}
								onChangeFunction={(e) => {
									dispatch(
										setHospitalFilter({
											...filter,
											hospitalWcfCodeLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</BaseColumn>

				<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckbox
						itemName="CheckHospitalDbmsCode"
						label={names.hospitalDbmsCode}
						checked={filter.CheckHospitalDbmsCode}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setHospitalFilter({
									...filter,
									CheckHospitalDbmsCode: !filter.CheckHospitalDbmsCode,
								})
							)
						}
					/>
					{filter.CheckHospitalDbmsCode && (
						<div className=" pt-1">
							<BaseItemInput
								itemName="hospitalDbmsCodeLike"
								value={`${filter.hospitalDbmsCodeLike}`}
								onChangeFunction={(e) => {
									dispatch(
										setHospitalFilter({
											...filter,
											hospitalDbmsCodeLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</BaseColumn>

				<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckbox
						itemName="CheckHospitalMinistryCode"
						label={names.hospitalMinistryCode}
						checked={filter.CheckHospitalMinistryCode}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setHospitalFilter({
									...filter,
									CheckHospitalMinistryCode: !filter.CheckHospitalMinistryCode,
								})
							)
						}
					/>
					{filter.CheckHospitalMinistryCode && (
						<div className=" pt-1">
							<BaseItemInput
								itemName="hospitalMinistryCodeLike"
								value={`${filter.hospitalMinistryCodeLike}`}
								onChangeFunction={(e) => {
									dispatch(
										setHospitalFilter({
											...filter,
											hospitalMinistryCodeLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</BaseColumn>

				<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckbox
						itemName="CheckHospitalName"
						label={names.hospitalName}
						checked={filter.CheckHospitalName}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setHospitalFilter({
									...filter,
									CheckHospitalName: !filter.CheckHospitalName,
								})
							)
						}
					/>
					{filter.CheckHospitalName && (
						<div className=" pt-1">
							<BaseItemInput
								itemName="hospitalNameLike"
								value={`${filter.hospitalNameLike}`}
								onChangeFunction={(e) => {
									dispatch(
										setHospitalFilter({
											...filter,
											hospitalNameLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</BaseColumn>

				<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckbox
						itemName="CheckSp7EndDate"
						label={names.sp7EndDate}
						checked={filter.CheckSp7EndDate}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setHospitalFilter({
									...filter,
									CheckSp7EndDate: !filter.CheckSp7EndDate,
								})
							)
						}
					/>
					{filter.CheckSp7EndDate && (
						<div className="pt-1">
							<BaseItemDateRangePicker
								itemName="sp7EndDateBetween"
								notForm
								// value={
								// 	filter.sp7EndDateBetween
								// 		? [
								// 				dayjs(filter.sp7EndDateBetween[0]),
								// 				dayjs(filter.sp7EndDateBetween[1]),
								// 		  ]
								// 		: null
								// }
								// onChangeRangePicker={(e) => {
								// 	dispatch(
								// 		setHospitalFilter({
								// 			...filter,
								// 			sp7EndDateBetween: e,
								// 		})
								// 	);
								// }}
							/>
						</div>
					)}
				</BaseColumn>

				<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckbox
						itemName="sp19EndDateBetween"
						label={names.sp19EndDate}
						checked={filter.CheckSp19EndDate}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setHospitalFilter({
									...filter,
									CheckSp19EndDate: !filter.CheckSp19EndDate,
								})
							)
						}
					/>
					{filter.CheckSp19EndDate && (
						<div className="pt-1">
							<BaseItemDateRangePicker
								itemName="hospitalWcfCodeLike"
								// value={[
								// 	filter.sp19EndDateBetween
								// 		? dayjs(filter.sp19EndDateBetween[0])
								// 		: null,
								// 	filter.sp19EndDateBetween
								// 		? dayjs(filter.sp19EndDateBetween[1])
								// 		: null,
								// ]}
								// onChangeRangePicker={(e) => {
								// 	dispatch(
								// 		setHospitalFilter({
								// 			...filter,
								// 			sp19EndDateBetween: e,
								// 		})
								// 	);
								// }}
							/>
						</div>
					)}
				</BaseColumn>

				<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckboxFilterGroup
						isMainInputChecked={filter.checkIsActive}
						onClickMainInputFunction={() => {
							dispatch(
								setHospitalFilter({
									...filter,
									checkIsActive: !filter.checkIsActive,
									isActive: undefined,
								})
							);
						}}
						subInputValue={filter.isActive}
						onClickSubInputYFunction={() => {
							dispatch(
								setHospitalFilter({
									...filter,
									isActive: IsActive.Y,
								})
							);
						}}
						onClickSubInputNFunction={() => {
							dispatch(
								setHospitalFilter({
									...filter,
									isActive: IsActive.N,
								})
							);
						}}
					/>
				</BaseColumn>
			</BaseColumn>
		</BaseForm>
	);
}
