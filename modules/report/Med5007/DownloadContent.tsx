import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseForm } from "wcf-component-lib/src/components";
import { Med5007Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";

interface Props {
	med5007: Med5007Form;
	form: FormInstance<Med5007Form>;
	onFinish: FormProps<Med5007Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const { med5007, form, onFinish } = props;
	return (
		<BaseForm initialValues={med5007} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<MedDropDown
					itemName="hospitalType"
					label="ระดับของสถานพยาบาล"
					type={SESSION_NAME.HOSPITAL_TYPE}
				/>
			</div>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<MedDropDown
					itemName="hospitalCategory"
					label="ประเภทของสถานพยาบาล"
					type={SESSION_NAME.HOSPITAL_CATEGORY}
				/>
			</div>
		</BaseForm>
	);
}
