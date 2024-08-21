"use client";

import React, { useEffect } from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { Address } from "wcf-component-lib/src/components/BaseThaiAddress/model";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";
import { setDoctorData, setDoctorForm } from "../../redux";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { DoctorData } from "../../redux/form/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { itemsTables } from "./model";
import { setDialog } from "@/redux/slices/dialog";

export default function DoctorDetail() {
	const dispatch: AppDispatch = useDispatch();
	const { doctorData, dialog } = useSelector(
		(state: SliceModel) => ({
			doctorData: state.doctor.doctorForm.doctorData,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	// const handleAddress = (asd: string) => {

	// 	const data: Address = raw_address.find(
	// 		(e: Address) => e.province_id === asd
	// 	);
	// 	console.log("data.province_name", data.province_name);
	// };

	// console.log("form", form.getFieldValue("province"));
	// console.log(handleAddress(form.getFieldValue("province")));

	const onFinish: FormProps<DoctorData>["onFinish"] = async (
		values: DoctorData
	) => {
		console.log("value", values);
		dispatch(
			setDialog({
				...dialog,
				isOpen: true,
				content: <>asd</>,
			})
		);
	};

	const onFinishFailed: FormProps<DoctorData>["onFinishFailed"] = (_) => {};

	const [form] = Form.useForm();

	return (
		<BaseForm
			initialValues={doctorData}
			name={"doctorForm"}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			extraForm={form}
		>
			<div className="grid grid-cols-4 gap-y-2 gap-x-8 items-start">
				<BaseItemInput label="doctorId" itemName="doctorId" rules={[]} />
				<BaseItemInput label="amphur" itemName="amphur" rules={[]} />
				<BaseItemInput label="houseNum" itemName="houseNum" rules={[]} />
				<BaseItemInput label="moo" itemName="moo" rules={[]} />
				<BaseItemInput label="province" itemName="province" rules={[]} />
				<BaseItemInput label="road" itemName="road" rules={[]} />
				<BaseItemInput label="soi" itemName="soi" rules={[]} />
				<BaseItemInput label="citizenId" itemName="citizenId" rules={[]} />
				<BaseItemInput label="doctorCode" itemName="doctorCode" rules={[]} />
				<BaseItemInput label="doctorType" itemName="doctorType" rules={[]} />
				<BaseItemInput label="firstName" itemName="firstname" rules={[]} />
				<BaseItemInput label="lastName" itemName="lastname" rules={[]} />
				<BaseItemInput label="position" itemName="position" rules={[]} />
				<BaseItemInput label="postalName" itemName="postalName" rules={[]} />
				<BaseItemInput label="postcode" itemName="postcode" rules={[]} />
				<BaseItemInput
					label="professionalCode"
					itemName="professionalCode"
					rules={[]}
				/>
				<BaseItemInput label="revenueNo" itemName="revenueNo" rules={[]} />
				<BaseItemInput label="title" itemName="title" rules={[]} />
				<BaseDropDown
					label="ตำบล"
					itemName="tambol"
					type="tambons_name"
					getValue={(e: Address) =>
						form.setFieldsValue({
							province: e.province_id,
							amphur: e.amphure_id,
							postcode: e.zipcode,
						})
					}
					labelRender={() => <p>{findLabelAddress(form).tambons_name}</p>}
				/>
				<BaseDropDown
					label="อำเภอ"
					itemName="amphur"
					type="amphure_name"
					getValue={(e: Address) =>
						form.setFieldsValue({
							province: e.province_id,
							tambol: e.tambons_id,
							postcode: e.zipcode,
						})
					}
					labelRender={() => <p>{findLabelAddress(form).amphure_name}</p>}
				/>
				<BaseDropDown
					label="จังหวัด"
					itemName="province"
					type="province_name"
					getValue={(e: Address) =>
						form.setFieldsValue({
							tambol: e.tambons_id,
							amphur: e.amphure_id,
							postcode: e.zipcode,
						})
					}
					labelRender={() => <p>{findLabelAddress(form).province_name}</p>}
				/>
				<BaseDropDown
					label="รหัสไปรษณีย์"
					itemName="postcode"
					type="zipcode"
					getValue={(e: Address) =>
						form.setFieldsValue({
							province: e.province_id,
							amphur: e.amphure_id,
							tambol: e.tambons_id,
						})
					}
					labelRender={() => <p>{findLabelAddress(form).zipcode}</p>}
				/>

				<BaseButton label="บันทึก" htmlType="submit" />
				<div className="col-span-4">
					{itemsTables?.map((item, index: number) => (
						<BaseCollapse
							key={item.key}
							defaultActiveKey={index + 1}
							items={[item]}
						/>
					))}
				</div>
			</div>
		</BaseForm>
	);
}
