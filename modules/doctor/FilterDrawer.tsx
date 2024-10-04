import { AppDispatch } from "@/redux/config/configStore";
import React from "react";
import { useDispatch } from "react-redux";
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
			<BaseColumn>
				<div className="filter-box space-y-2">
					<BaseItemCheckbox
						itemName="checkProfessionalCode"
						label="เลขทะเบียนวิชาชีพ"
						// checked={filter.checkProfessionalCode}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() => {
							dispatch(
								setDoctorFilter({
									...filter,
									checkProfessionalCode: !filter.checkProfessionalCode,
									professionalCodeLike: "",
								})
							);
						}}
					/>
					{filter.checkProfessionalCode && (
						<BaseItemInput itemName="professionalCodeLike" />
					)}
				</div>
				<div className="filter-box space-y-2">
					<BaseItemCheckbox
						itemName="checkProviceHospital"
						label="โรงพยาบาลประจำจังหวัด"
						// checked={filter.checkProviceHospital}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() => {
							dispatch(
								setDoctorFilter({
									...filter,
									checkProviceHospital: !filter.checkProviceHospital,
									proviceHospitalLike: null,
								})
							);
							// form.setFieldValue("proviceHospitalLike", null);
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
				</div>
				<div className="filter-box space-y-2">
					<BaseItemCheckbox
						itemName="checkHospitalName"
						label="ชื่อโรงพยาบาล"
						checked={filter.checkHospitalName}
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() => {
							dispatch(
								setDoctorFilter({
									...filter,
									checkHospitalName: !filter.checkHospitalName,
									hospitalNameLike: null,
								})
							);
							// form.setFieldValue("hospitalNameLike", null);
						}}
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
				</div>
				<div className="filter-box space-y-2">
					<BaseItemCheckbox
						itemName="checkDiplomaType"
						label="วุฒิบัตรเฉพาะทาง"
						labelPosition={BaseFormItemPosition.RIGHT}
						onClickFunction={() => {
							dispatch(
								setDoctorFilter({
									...filter,
									checkDiplomaType: !filter.checkDiplomaType,
									diplomaTypeLike: null,
								})
							);
							// form.setFieldValue("diplomaTypeLike", null);
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
				</div>
				<div className="filter-box space-y-2">
					<BaseItemCheckboxFilterGroup
						isMainInputChecked={filter.checkIsActive}
						notForm
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
									isActive:
										filter.isActive === IsActive.Y ? undefined : IsActive.Y,
								})
							);
						}}
						onClickSubInputNFunction={() => {
							dispatch(
								setDoctorFilter({
									...filter,
									isActive:
										filter.isActive === IsActive.N ? undefined : IsActive.N,
								})
							);
						}}
					/>
				</div>
			</BaseColumn>
		</BaseForm>
	);
}
