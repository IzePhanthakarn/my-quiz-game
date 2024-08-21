"use client";

import React, { useEffect } from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import BaseTabs from "wcf-component-lib/src/components/BaseTabs";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { SliceModel } from "@/redux/slices/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { initGetDoctorForm } from "../service";
import { useParams } from "next/navigation";
import { itemsTabs } from "./model";
import { Doctor } from "../redux/model";
import { DoctorData } from "../redux/form/model";
import { setDoctorForm } from "../redux";

const DoctorFormTabs = () => {
	const { uuid } = useParams();
	const dispatch: AppDispatch = useDispatch();

	const [form] = Form.useForm();

	const { doctorForm } = useSelector(
		(state: SliceModel) => ({
			doctorForm: state.doctor.doctorForm,
		}),
		shallowEqual
	);

	const onFinish: FormProps<Doctor>["onFinish"] = async (values: Doctor) => {
		console.log("value", values);
	};

	console.log("form", form.getFieldsValue());
	const onFinishFailed: FormProps<Doctor>["onFinishFailed"] = (_) => {};

	useEffect(() => {
		if (uuid) dispatch(initGetDoctorForm(`${uuid}`));
	}, [uuid]);

	const customValue = Form.useWatch(
		(values: DoctorData) => `name: ${values.firstName || ""}`,
		form
	);

	return (
		<BaseColumn className="bg-white p-2 h-full">
			<BaseForm
				initialValues={doctorForm}
				name={"doctorForm"}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				onValuesChange={(e) =>
					dispatch(
						setDoctorForm({
							...doctorForm,
							doctor: { ...doctorForm.doctor, ...e },
						})
					)
				}
			>
				<BaseTabs defaultActiveKey={"1"} items={itemsTabs} />
			</BaseForm>
		</BaseColumn>
	);
};
export default dynamic(() => Promise.resolve(DoctorFormTabs), { ssr: false });
