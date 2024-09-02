"use client";

import React, { useEffect } from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { setDoctorData } from "../../redux";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { DoctorData } from "../../redux/form/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { Address } from "wcf-component-lib/src/components/BaseDropDown/model";
import BaseHorizontalHeader from "wcf-component-lib/src/components/BaseHorizontalHeader";
import UserOutlined from "wcf-component-lib/node_modules/@ant-design/icons/UserOutlined";
import HomeFilled from "wcf-component-lib/node_modules/@ant-design/icons/HomeFilled";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_TYPE } from "wcf-component-lib/src/constants/dropdown";

export default function DoctorDetailForm() {
	const dispatch: AppDispatch = useDispatch();
	const { doctorData, dialog } = useSelector(
		(state: SliceModel) => ({
			doctorData: state.doctor.doctorForm.doctorData,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	const onFinish: FormProps<DoctorData>["onFinish"] = async (
		values: DoctorData
	) => {
		console.log("value Finish", values);
		// dispatch(
		// 	setDialog({
		// 		...dialog,
		// 		isOpen: true,
		// 		content: <>asd</>,
		// 	})
		// );
	};

	const onFinishFailed: FormProps<DoctorData>["onFinishFailed"] = (_) => {};

	return (
		<BaseForm
			initialValues={{ ...doctorData }}
			name={"doctorForm"}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			// onValuesChange={(e: DoctorData) => {
			// 	dispatch(setDoctorData({ ...doctorData, ...(e as DoctorData) }));
			// }}
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
				<div></div>
				<BaseItemInput label="คำนำหน้า" itemName="title" rules={[]} />
				<BaseItemInput label="ชื่อ" itemName="firstname" rules={[]} />
				<BaseItemInput label="นามสกุล" itemName="lastname" rules={[]} />
				<div></div>
				<BaseItemInput label="ประเภทแพทย์" itemName="doctorType" rules={[]} />
				<BaseItemInput label="เลขที่ภาษี" itemName="revenueNo" rules={[]} />
				<div className="col-span-2"></div>
				<div className="col-span-4 ">
					<BaseHorizontalHeader title={"ที่อยู่"} icons={<HomeFilled />} />
				</div>
				<BaseItemInput label="ที่อยู่" itemName="houseNum" rules={[]} />
				<BaseItemInput label="หมู่ที่" itemName="moo" rules={[]} />
				<BaseItemInput label="ถนน" itemName="road" rules={[]} />
				<BaseItemInput label="ซอย" itemName="soi" rules={[]} />
				<MedDropDown
					type={DROPDOWN_TYPE.HOSPITAL_TYPE}
					label="ทดสอบ"
					className="h-full w-full"
					bodyRequest={{
						groupNameLike: DROPDOWN_TYPE.HOSPITAL_TYPE,
					}}
				/>
				<MedDropDown
					type={DROPDOWN_TYPE.ADDRESS}
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
					label="อำเภอ"
					itemName="amphur"
					type={DROPDOWN_TYPE.ADDRESS}
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
				<MedDropDown
					label="ตำบล"
					itemName="tambol"
					type={DROPDOWN_TYPE.ADDRESS}
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
					label="รหัสไปรษณีย์"
					itemName="postcode"
					type={DROPDOWN_TYPE.ADDRESS}
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
				{/* <BaseItemInput label="ตำแหน่ง" itemName="position" rules={[]} /> */}
				<div className="col-span-3"></div>
				<BaseButton className="my-2" label="บันทึก" htmlType="submit" />
				{/* <div className="col-span-4">
					{itemsTables?.map((item, index: number) => (
						<BaseCollapse
							key={item.key || index}
							defaultActiveKey={index + 1}
							items={[item]}
						/>
					))}
				</div> */}
			</div>
		</BaseForm>
	);
}
