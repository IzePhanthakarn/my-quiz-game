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
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { DoctorFilter } from "./redux/filter/model";

interface Props {
	form: FormInstance<any>;
	onFinish: FormProps<DoctorFilter>["onFinish"];
	filter: DoctorFilter;
}

export default function FilterDrawer(prop: Props) {
	const { form, onFinish, filter } = prop;
	const dispatch: AppDispatch = useDispatch();

	return (
		<BaseForm extraForm={form} initialValues={filter} onFinish={onFinish}>
			<BaseColumn className="space-y-4">
				<BaseColumn className="space-y-2 py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
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
								})
							)
						}
					/>
					{filter.checkProfessionalCode && (
						<BaseItemInput itemName="professionalCodeLike" />
					)}
				</BaseColumn>
				<BaseColumn className="space-y-2 py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckbox
						itemName="checkProviceHospital"
						label="โรงพยาบาลประจำจังหวัด"
						checked={filter.checkProviceHospital}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() => {
							dispatch(
								setDoctorFilter({
									...filter,
									checkProviceHospital: !filter.checkProviceHospital,
								})
							);
							form.setFieldValue("proviceHospitalLike", null);
						}}
					/>
					{filter.checkProviceHospital && (
						<MedDropDown
							itemName="proviceHospitalLike"
							type={SESSION_NAME.PROVINCE_NAME}
							getValue={(e) => {
								form.setFieldValue("proviceHospitalLike", e);
							}}
						/>
					)}
				</BaseColumn>
				<BaseColumn className="space-y-2 py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
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
						<>
							<MedDropDown
								itemName="hospitalNameLike"
								type={SESSION_NAME.HOSPITAL}
								getValue={(e) => {
									form.setFieldValue("hospitalNameLike", e);
								}}
							/>
						</>
					)}
				</BaseColumn>
				<BaseColumn className="space-y-2 py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckbox
						itemName="checkDiplomaType"
						label="วุฒิบัตรเฉพาะทาง"
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() => {
							dispatch(
								setDoctorFilter({
									...filter,
									checkDiplomaType: !filter.checkDiplomaType,
								})
							);
							form.setFieldValue("diplomaTypeLike", null);
						}}
					/>
					{filter.checkDiplomaType && (
						<>
							<MedDropDown
								itemName="diplomaTypeLike"
								type={SESSION_NAME.DIPLOMA}
								getValue={(e) => {
									form.setFieldValue("diplomaTypeLike", e);
								}}
							/>
						</>
					)}
				</BaseColumn>
				<BaseColumn className="space-y-2 py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
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
		</BaseForm>
	);
}
