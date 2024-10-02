import React from "react";
import { BaseDatePicker, BaseForm } from "wcf-component-lib/src/components";
import { Med5008Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";

interface Props {
	med5008: Med5008Form;
	form: FormInstance<Med5008Form>;
	onFinish: FormProps<Med5008Form>["onFinish"];
}
export default function DownloadContent(props: Props) {
	const { med5008, form, onFinish } = props;
	return (
		<BaseForm initialValues={med5008} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			<BaseDatePicker label="วันที่ยกเลิกสถานพยาบาล" itemName={"fromDate"}/>
			
			</div>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			<BaseDatePicker label="ถึงวันที่" itemName={"toDate"}/>
			</div>
		</BaseForm>
	);
}
