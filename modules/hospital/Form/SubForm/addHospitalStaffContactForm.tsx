"use client";

import React from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import {
	HospitalStaffContactForm,
	modelHospitalStaffContact,
} from "@/modules/hospital/redux/models/hospitalStaffContactModel";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import UserAddOutlined from "wcf-component-lib/node_modules/@ant-design/icons/UserAddOutlined";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import _ from "lodash";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import BaseUniqueContentModalHeader from "wcf-component-lib/src/components/BaseUniqueContentModalHeader";

import BaseButtonSave from "wcf-component-lib/src/components/BaseButtonSave";
import { addHospitalStaffContactRules } from "@/modules/hospital/field-validation/FormValidation";
import { hospitalStaffContactNames } from "@/modules/hospital/interfaces/names";
import { addHospitalStaffContact } from "@/modules/hospital/service/";

export default function AddHospitalStaffContactForm() {
	const dispatch: AppDispatch = useDispatch();
	const { outsideHospitalForm, hospitalStaffContact } = useSelector(
		(state: SliceModel) => ({
			outsideHospitalForm: state.hospital.outsideHospitalForm,
			hospitalStaffContact: state.hospital.hospitalStaffContact,
		}),
		shallowEqual
	);

	const [form] = Form.useForm<HospitalStaffContactForm>();

	const onFinish: FormProps<HospitalStaffContactForm>["onFinish"] = async (
		values
	) => {
		dispatch(
			addHospitalStaffContact(outsideHospitalForm, values, hospitalStaffContact)
		);
		form.setFieldsValue(modelHospitalStaffContact.form);
	};

	const onFinishFailed: FormProps<HospitalStaffContactForm>["onFinishFailed"] =
		(_) => {};

	return (
		<>
			<BaseUniqueContentModalHeader headerText="เพิ่มผู้ติดต่อสำหรับสถานพยาบาล" />
			<BaseForm
				initialValues={modelHospitalStaffContact.form}
				name="addHospitalStaffContactForm"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				extraForm={form}
			>
				<div className="grid gap-x-4 gap-y-2 grid-cols-2 mb-2">
					<BaseItemInput
						label={hospitalStaffContactNames.firstName}
						itemName="firstName"
						rules={addHospitalStaffContactRules.firstNameSchema}
					/>
					<BaseItemInput
						label={hospitalStaffContactNames.lastName}
						itemName="lastName"
						rules={addHospitalStaffContactRules.lastNameSchema}
					/>
					<BaseItemInput
						label={hospitalStaffContactNames.position}
						itemName="position"
						rules={addHospitalStaffContactRules.positionSchema}
					/>
					<BaseItemInput
						label={hospitalStaffContactNames.contact}
						itemName="contact"
						rules={addHospitalStaffContactRules.contactSchema}
					/>
				</div>
				<div>
					<BaseButtonSave
						className="w-full"
						htmlType="submit"
						icon={<UserAddOutlined />}
						customStyle={{
							height: "48px",
						}}
					/>
				</div>
			</BaseForm>
		</>
	);
}
