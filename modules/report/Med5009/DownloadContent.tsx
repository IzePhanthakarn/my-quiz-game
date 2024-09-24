import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseForm } from "wcf-component-lib/src/components";
import { Med5009Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";

interface Props {
	med5009: Med5009Form;
	form: FormInstance<Med5009Form>;
	onFinish: FormProps<Med5009Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const { med5009, form, onFinish } = props;
	return (
		<BaseForm initialValues={med5009} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<MedDropDown
					itemName="propertyCode"
					label="ระดับของสถานพยาบาล"
					type={SESSION_NAME.HOSPITAL_TYPE}
				/>
			</div>
		</BaseForm>
	);
}
