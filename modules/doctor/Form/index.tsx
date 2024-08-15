"use client";

import React, { useEffect } from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import FormOne from "./CollapseOne";
import BaseTabs from "wcf-component-lib/src/components/BaseTabs";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import { TabsProps } from "wcf-component-lib/node_modules/antd/es/tabs";
import Two from "./Two";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setUuid } from "@/redux/slices/container";
import { getValue } from "@/utils";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { SliceModel } from "@/redux/slices/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import {
	DoctorForm,
	modelDoctorForm,
} from "../../../modules/doctor/redux/form/model";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { initGetDoctorForm } from "../service";
import { useParams } from "next/navigation";
import { itemsTabs } from "./model";

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

	const onFinish: FormProps<DoctorForm>["onFinish"] = async (
		values: DoctorForm
	) => {
		console.log("value", values);
	};

	console.log("form", form.getFieldsValue());
	const onFinishFailed: FormProps<DoctorForm>["onFinishFailed"] = (_) => {};

	useEffect(() => {
		if (uuid) dispatch(initGetDoctorForm(`${uuid}`));
	}, [uuid]);

	const customValue = Form.useWatch(
		(values: DoctorForm) => `name: ${values.firstName || ""}`,
		form
	);

	return (
		<BaseColumn className="bg-white p-2 h-full">
			<button onClick={() => console.log("form", form.getFieldsValue())}>
				กดนิดๆ
			</button>
			<BaseForm
				initialValues={doctorForm}
				child={
					<div>
						<p>asd {customValue}</p>
						<BaseTabs defaultActiveKey={"1"} items={itemsTabs} />
					</div>
				}
				name={"doctorForm"}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				onValuesChange={(e) => console.log("e", e)}
			/>
		</BaseColumn>
	);
};
export default dynamic(() => Promise.resolve(DoctorFormTabs), { ssr: false });
