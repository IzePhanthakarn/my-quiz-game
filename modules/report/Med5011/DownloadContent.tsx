import React from "react";
import { BaseDatePicker, BaseForm } from "wcf-component-lib/src/components";
import { Med5011Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";

interface Props {
	med5011: Med5011Form;
	form: FormInstance<Med5011Form>;
	onFinish: FormProps<Med5011Form>["onFinish"];
}
export default function DownloadContent(props: Props) {
	const { med5011, form, onFinish } = props;
	return (
		<BaseForm initialValues={med5011} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			   <div><BaseDatePicker label="วันที่ยกเลิกสถานพยาบาล" itemName={"fromDate"} /></div>
			   <div >
			   <BaseDatePicker label="ถึงวันที่" itemName={"toDate"}/>
			   </div>
			</div>		 
		</BaseForm>
	);
}
