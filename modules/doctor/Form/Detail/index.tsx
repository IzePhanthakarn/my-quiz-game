"use client";

import React, { useEffect, useState } from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _, { set } from "lodash";
import { setDoctorData } from "../../redux";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { DoctorData } from "../../redux/form/model";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { Address } from "wcf-component-lib/src/components/BaseDropDown/model";
import BaseHorizontalHeader from "wcf-component-lib/src/components/BaseHorizontalHeader";
import UserOutlined from "wcf-component-lib/node_modules/@ant-design/icons/UserOutlined";
import HomeFilled from "wcf-component-lib/node_modules/@ant-design/icons/HomeFilled";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { findNameDisplay } from "@/components/MedDropDown/service";
import { doctorDataName } from "./interfaces/names";
import { rules } from "./field-validation/FormValidation";
import {
	FormProps,
	FormInstance,
} from "wcf-component-lib/node_modules/antd/es/form/Form";
import { useParams } from "next/navigation";

interface Props {
	form: FormInstance<any>;
	onFinish: (values: any) => void;
}

export default function DoctorDetailForm(props: Props) {
	const { form, onFinish } = props;
	const { uuid } = useParams();
	const dispatch: AppDispatch = useDispatch();
	const { doctorData } = useSelector(
		(state: SliceModel) => ({
			doctorData: state.doctor.doctorForm.doctorData,
		}),
		shallowEqual
	);
	const [tmpDoctorData, setTmpDoctorData] = useState(doctorData.doctorCode);

	useEffect(() => {
		if (_.isEmpty(tmpDoctorData) && uuid) {
			setTmpDoctorData(doctorData.doctorCode);
		}
	}, [doctorData.doctorCode]);
	const isE = doctorData.isELearning;
	return (
		<BaseForm
			initialValues={doctorData}
			name="doctorForm"
			extraForm={form}
			onValuesChange={(e: DoctorData) => {
				dispatch(setDoctorData({ ...doctorData, ...(e as DoctorData) }));
			}}
			onFinish={onFinish}
		>
			<div className="grid grid-cols-4 gap-y-2 gap-x-8 items-start">
				<div className="col-span-4">
					<BaseHorizontalHeader title={"รายละเอียด"} icons={<UserOutlined />} />
				</div>
				<BaseItemInput
					label={doctorDataName.professionalCode}
					itemName="professionalCode"
					disabled={isE}
					rules={rules.professionalCodeSchema}
				/>
				<div className="col-span-2">
					<MedDropDown
						type={SESSION_NAME.COURSE_CATEGORY}
						label={doctorDataName.courseCategory}
						itemName="courseCategory"
						disabled={isE}
						rules={rules.courseCategorySchema}
						getValue={(e) => {
							if (e === "F") {
								dispatch(
									setDoctorData({
										...doctorData,
										courseCategory: e,
										categoryDescription: findNameDisplay(
											SESSION_NAME.COURSE_CATEGORY,
											e
										),
										doctorCode: tmpDoctorData,
									})
								);
							} else {
								dispatch(
									setDoctorData({
										...doctorData,
										courseCategory: e,
										categoryDescription: findNameDisplay(
											SESSION_NAME.COURSE_CATEGORY,
											e
										),
										doctorCode: `${e}${tmpDoctorData}`,
									})
								);
							}
						}}
					/>
				</div>
				<BaseItemInput
					label={doctorDataName.certificateId}
					itemName="certificateId"
					disabled={isE}
				/>
				<BaseItemInput
					label={doctorDataName.doctorCode}
					itemName="doctorCode"
					disabled={isE}
					rules={rules.doctorCodeSchema}
				/>
				<BaseItemInput
					label={doctorDataName.citizenId}
					itemName="citizenId"
					disabled={isE}
					rules={rules.citizenIdSchema}
				/>
				<MedDropDown
					type={SESSION_NAME.DOCTOR_TYPE}
					label={doctorDataName.doctorType}
					itemName="doctorType"
					className="h-full w-full"
					disabled={isE}
					rules={rules.doctorTypeSchema}
					labelRender={() => (
						<p>
							{findNameDisplay(SESSION_NAME.DOCTOR_TYPE, doctorData.doctorType)}
						</p>
					)}
				/>
				<BaseItemInput
					label={doctorDataName.revenueNo}
					itemName="revenueNo"
					disabled={isE}
					rules={rules.revenueNoSchema}
				/>
				{isE ? (
					<BaseItemInput
						label={doctorDataName.title}
						itemName="eTitle"
						disabled={isE}
						rules={rules.titleSchema}
					/>
				) : (
					<MedDropDown
						type={SESSION_NAME.TITLE}
						label={doctorDataName.title}
						itemName="title"
						className="h-full w-full"
						disabled={isE}
						rules={rules.titleSchema}
						labelRender={() => (
							<p>{findNameDisplay(SESSION_NAME.TITLE, doctorData.title)}</p>
						)}
					/>
				)}

				<BaseItemInput
					label={doctorDataName.firstname}
					itemName="firstname"
					disabled={isE}
					rules={rules.firstNameSchema}
				/>
				<BaseItemInput
					label={doctorDataName.lastname}
					itemName="lastname"
					disabled={isE}
					rules={rules.lastNameSchema}
				/>
				<BaseItemInput
					label={doctorDataName.phoneNumber}
					itemName="phoneNumber"
					disabled={isE}
					rules={rules.phoneNumberSchema}
				/>
				{doctorData.courseCategory === "E" && (
					<>
						<BaseItemInput
							label={doctorDataName.eDiploma}
							itemName="eDiploma"
							disabled={isE}
						/>
						<BaseItemInput
							label={doctorDataName.eHospital}
							itemName="eHospital"
							disabled={isE}
						/>
					</>
				)}
				<div className="col-span-4">
					<BaseHorizontalHeader title={"ที่อยู่"} icons={<HomeFilled />} />
				</div>
				<BaseItemInput
					label={doctorDataName.houseNum}
					itemName="houseNum"
					disabled={isE}
					rules={rules.houseNumSchema}
				/>
				<BaseItemInput
					label={doctorDataName.moo}
					itemName="moo"
					disabled={isE}
					rules={rules.mooSchema}
				/>
				<BaseItemInput
					label={doctorDataName.road}
					itemName="road"
					disabled={isE}
					rules={rules.roadSchema}
				/>
				<div></div>
				<BaseItemInput
					label={doctorDataName.soi}
					itemName="soi"
					disabled={isE}
					rules={rules.soiSchema}
				/>
				<MedDropDown
					label={doctorDataName.tambol}
					itemName="tambol"
					type={SESSION_NAME.ADDRESS}
					disabled={isE}
					rules={rules.tambolSchema}
					getValue={(e: Address) => {
						dispatch(
							setDoctorData({
								...doctorData,
								amphur: e.amphurCode,
								province: e.provinceCode,
								tambol: e.tambolCode,
								postcode: e.postalCode,
							})
						);
					}}
					labelRender={() => (
						<p>{findLabelAddress(doctorData.tambol, ADDRESS.TAMBOL)}</p>
					)}
				/>
				<MedDropDown
					label={doctorDataName.amphur}
					itemName="amphur"
					type={SESSION_NAME.ADDRESS}
					disabled={isE}
					rules={rules.amphurSchema}
					getValue={(e: Address) =>
						dispatch(
							setDoctorData({
								...doctorData,
								amphur: e.amphurCode,
								province: e.provinceCode,
								tambol: e.tambolCode,
								postcode: e.postalCode,
							})
						)
					}
					labelRender={() => (
						<p>{findLabelAddress(doctorData.amphur, ADDRESS.AMPHUR)}</p>
					)}
				/>
				<div></div>
				<MedDropDown
					type={SESSION_NAME.ADDRESS}
					label={doctorDataName.province}
					itemName="province"
					className="h-full w-full"
					disabled={isE}
					rules={rules.provinceSchema}
					getValue={(e: Address) =>
						dispatch(
							setDoctorData({
								...doctorData,
								amphur: e.amphurCode,
								province: e.provinceCode,
								tambol: e.tambolCode,
								postcode: e.postalCode,
							})
						)
					}
					labelRender={() => (
						<p>{findLabelAddress(doctorData.province, ADDRESS.PROVINCE)}</p>
					)}
				/>
				<MedDropDown
					label={doctorDataName.postcode}
					itemName="postcode"
					type={SESSION_NAME.ADDRESS}
					disabled={isE}
					rules={rules.postcodeSchema}
					getValue={(e: Address) =>
						dispatch(
							setDoctorData({
								...doctorData,
								amphur: e.amphurCode,
								province: e.provinceCode,
								tambol: e.tambolCode,
								postcode: e.postalCode,
							})
						)
					}
					labelRender={() => (
						<p>{findLabelAddress(doctorData.postcode, ADDRESS.POSTCODE)}</p>
					)}
				/>
			</div>
		</BaseForm>
	);
}
