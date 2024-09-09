"use client";

import React, { useEffect } from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
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
import { DROPDOWN_TYPE } from "@/components/MedDropDown/model";
import { findNameDisplay } from "@/components/MedDropDown/service";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import HeaderLayout from "wcf-component-lib/src/layout/HeaderLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";

export default function DoctorDetailForm() {
	const dispatch: AppDispatch = useDispatch();
	const { doctorData } = useSelector(
		(state: SliceModel) => ({
			doctorData: state.doctor.doctorForm.doctorData,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<p className="font-bold text-4xl leading-[48px]">
					บันทึก/แก้ไข ข้อมูลแพทย์
				</p>
			),
		});
	}, [dispatchLayout]);

	return (
		<BaseForm
			initialValues={{ ...doctorData }}
			name={"doctorForm"}
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
				<MedDropDown
					type={DROPDOWN_TYPE.TITLE}
					label="คำนำหน้า"
					itemName="title"
					className="h-full w-full"
					labelRender={() => (
						<p>{findNameDisplay(DROPDOWN_TYPE.TITLE, doctorData.title)}</p>
					)}
				/>
				<BaseItemInput label="ชื่อ" itemName="firstname" rules={[]} />
				<BaseItemInput label="นามสกุล" itemName="lastname" rules={[]} />
				<div></div>
				<MedDropDown
					type={DROPDOWN_TYPE.DOCTOR_TYPE}
					label="ประเภทแพทย์"
					itemName="doctorType"
					className="h-full w-full"
					labelRender={() => (
						<p>
							{findNameDisplay(
								DROPDOWN_TYPE.DOCTOR_TYPE,
								doctorData.doctorType
							)}
						</p>
					)}
				/>
				<BaseItemInput label="เลขที่ภาษี" itemName="revenueNo" rules={[]} />
				<div className="col-span-2"></div>
				<div className="col-span-4 ">
					<BaseHorizontalHeader title={"ที่อยู่"} icons={<HomeFilled />} />
				</div>
				<BaseItemInput label="ที่อยู่" itemName="houseNum" rules={[]} />
				<BaseItemInput label="ถนน" itemName="road" rules={[]} />
				<BaseItemInput label="ซอย" itemName="soi" rules={[]} />
				<div></div>
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
				<div></div>
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
				<BaseItemInput label="หมู่ที่" itemName="moo" rules={[]} />
			</div>
		</BaseForm>
	);
}
