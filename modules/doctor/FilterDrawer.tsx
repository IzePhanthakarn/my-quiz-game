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
import { DoctorForm } from "./redux/form/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { DoctorFilter } from "./redux/filter/model";

interface Props {
	form: FormInstance<any>;
	onFinish: FormProps<DoctorForm>["onFinish"];
	filter: DoctorFilter;
}

export default function FilterDrawer(prop: Props) {
	const { form, onFinish, filter } = prop;
	const dispatch: AppDispatch = useDispatch();

	return (
		<BaseForm extraForm={form} initialValues={filter} onFinish={onFinish}>
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
								})
							)
						}
					/>
					{filter.checkProfessionalCode && (
						<BaseItemInput itemName="professionalCodeLike" />
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
						<BaseItemInput itemName="hospitalNameLike" />
					)}
				</BaseColumn>
				<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<BaseItemCheckbox
						itemName="checkLastName"
						label="วุฒิบัตรเฉพาะทาง"
						checked={filter.checkDiplomaType}
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
								// notForm={true}
								// className="h-full w-full"
								// value={filter.diplomaTypeLike}
								type={SESSION_NAME.DIPLOMA}
								getValue={(e) => {
									form.setFieldValue("diplomaTypeLike", e);
									// dispatch(setDoctorFilter({ ...filter, diplomaTypeLike: e }));
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
		</BaseForm>
	);
}
