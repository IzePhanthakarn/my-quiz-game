"use client";

import React, { useEffect } from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { setDoctorData, setDoctorForm } from "../../redux";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { DoctorData, modelDoctorForm } from "../../redux/form/model";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { Address } from "wcf-component-lib/src/components/BaseDropDown/model";
import BaseHorizontalHeader from "wcf-component-lib/src/components/BaseHorizontalHeader";
import UserOutlined from "wcf-component-lib/node_modules/@ant-design/icons/UserOutlined";
import HomeFilled from "wcf-component-lib/node_modules/@ant-design/icons/HomeFilled";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { findNameDisplay } from "@/components/MedDropDown/service";

export default function DoctorDetailForm() {
	const dispatch: AppDispatch = useDispatch();
	const { doctorData } = useSelector(
		(state: SliceModel) => ({
			doctorData: state.doctor.doctorForm.doctorData,
		}),
		shallowEqual
	);

	return (
		<BaseForm
			initialValues={doctorData}
			name="doctorForm"
			onValuesChange={(e: DoctorData) => {
				dispatch(setDoctorData({ ...doctorData, ...(e as DoctorData) }));
			}}
		>
			<div className="grid grid-cols-4 gap-y-2 gap-x-8 items-start">
				<div className="col-span-4">
					<BaseHorizontalHeader title={"รายละเอียด"} icons={<UserOutlined />} />
				</div>
				<BaseItemInput
					label="เลขทะเบียนวิชาชีพ"
					itemName="professionalCode"
					rules={[]}
				/>
				<div className="col-span-2">
					<MedDropDown
						type={SESSION_NAME.COURSE_CATEGORY}
						label="หลักสูตรอบรม"
						itemName="courseCategory"
					/>
				</div>
				<div></div>
				<BaseItemInput
					label="เลขทะเบียน สปส"
					itemName="doctorCode"
					rules={[]}
				/>

				<BaseItemInput
					label="เลขที่บัตรประชาชน"
					itemName="citizenId"
					rules={[]}
				/>

				<MedDropDown
					type={SESSION_NAME.DOCTOR_TYPE}
					label="ประเภทแพทย์"
					itemName="doctorType"
					className="h-full w-full"
					labelRender={() => (
						<p>
							{findNameDisplay(SESSION_NAME.DOCTOR_TYPE, doctorData.doctorType)}
						</p>
					)}
				/>
				<BaseItemInput label="เลขที่ภาษี" itemName="revenueNo" rules={[]} />
				<MedDropDown
					type={SESSION_NAME.TITLE}
					label="คำนำหน้า"
					itemName="title"
					className="h-full w-full"
					labelRender={() => (
						<p>{findNameDisplay(SESSION_NAME.TITLE, doctorData.title)}</p>
					)}
				/>
				<BaseItemInput label="ชื่อ" itemName="firstname" rules={[]} />
				<BaseItemInput label="นามสกุล" itemName="lastname" rules={[]} />
				<div className="col-span-2"></div>
				<div className="col-span-4 ">
					<BaseHorizontalHeader title={"ที่อยู่"} icons={<HomeFilled />} />
				</div>
				<BaseItemInput label="ที่อยู่" itemName="houseNum" rules={[]} />
				<BaseItemInput label="หมู่ที่" itemName="moo" rules={[]} />
				<BaseItemInput label="ถนน" itemName="road" rules={[]} />
				<div></div>
				<BaseItemInput label="ซอย" itemName="soi" rules={[]} />
				<MedDropDown
					label="ตำบล"
					itemName="tambol"
					type={SESSION_NAME.ADDRESS}
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
					label="อำเภอ"
					itemName="amphur"
					type={SESSION_NAME.ADDRESS}
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
					label="จังหวัด"
					itemName="province"
					className="h-full w-full"
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
					label="รหัสไปรษณีย์"
					itemName="postcode"
					type={SESSION_NAME.ADDRESS}
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
