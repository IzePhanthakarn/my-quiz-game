import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import { setDoctorFilter } from "./redux";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.doctor.doctorFilter,
		}),
		shallowEqual
	);

	return (
		<BaseColumn className="space-y-4">
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkProfessionalCode"
					label="เลขทะเบียนวิชาชีพ"
					checked={filter.checkProfessionalCode}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDoctorFilter({
								...filter,
								checkProfessionalCode: !filter.checkProfessionalCode,
								professionalCodeLike: "",
							})
						)
					}
				/>
				{filter.checkProfessionalCode && (
					<BaseItemInput
						itemName="professionalCodeLike"
						value={filter.professionalCodeLike}
						onChangeFunction={(e) => {
							dispatch(
								setDoctorFilter({
									...filter,
									professionalCodeLike: e.target.value,
								})
							);
						}}
					/>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkProviceHospital"
					label="โรงพยาบาลประจำจังหวัด"
					checked={filter.checkProviceHospital}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDoctorFilter({
								...filter,
								checkProviceHospital: !filter.checkProviceHospital,
								proviceHospitalLike: "",
							})
						)
					}
				/>
				{filter.checkProviceHospital && (
					<MedDropDown
						notForm={true}
						className="h-full w-full"
						value={filter.proviceHospitalLike}
						type={SESSION_NAME.PROVINCE_NAME}
						getValue={(e) => {
							dispatch(
								setDoctorFilter({
									...filter,
									proviceHospitalLike: e,
								})
							);
						}}
					/>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkHospitalName"
					label="ชื่อโรงพยาบาล"
					checked={filter.checkHospitalName}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDoctorFilter({
								...filter,
								checkHospitalName: !filter.checkHospitalName,
								hospitalNameLike: "",
							})
						)
					}
				/>
				{filter.checkHospitalName && (
					<BaseItemInput
						itemName="hospitalNameLike"
						value={filter.hospitalNameLike}
						onChangeFunction={(e) => {
							dispatch(
								setDoctorFilter({
									...filter,
									hospitalNameLike: e.target.value,
								})
							);
						}}
					/>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkLastName"
					label="วุฒิบัตรเฉพาะทาง"
					checked={filter.checkDiplomaType}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDoctorFilter({
								...filter,
								checkDiplomaType: !filter.checkDiplomaType,
								diplomaTypeLike: "",
							})
						)
					}
				/>
				{filter.checkDiplomaType && (
					<>
						<MedDropDown
							type={SESSION_NAME.DIPLOMA}
							getValue={(e) => {
								dispatch(setDoctorFilter({ ...filter, diplomaTypeLike: e }));
							}}
						/>
					</>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckboxFilterGroup
					isMainInputChecked={filter.checkIsActive}
					onClickMainInputFunction={() => {
						dispatch(
							setDoctorFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setDoctorFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setDoctorFilter({
								...filter,
								isActive: IsActive.N,
							})
						);
					}}
				/>
			</BaseColumn>
		</BaseColumn>
	);
}
