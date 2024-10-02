import React from "react";
import { BaseButton, BaseForm } from "wcf-component-lib/src/components";
import { Med5010Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { handleOnExportExcel } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";

interface Props {
	med5010: Med5010Form;
	form: FormInstance<Med5010Form>;
	onFinish: FormProps<Med5010Form>["onFinish"];
}
export default function DownloadContent(props: Props) {
	const { med5010, form, onFinish } = props;
	function dispatch(arg0: (dispatch: import("../../../redux/config/configStore").AppDispatch) => Promise<void>) {
		throw new Error("Function not implemented.");
	}

	return (
		<BaseForm initialValues={med5010} extraForm={form} onFinish={onFinish}>
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
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<MedDropDown
					itemName="ssoProject"
					label="โครงการประกันสังคม"
					type={SESSION_NAME.SSO_PROJECT}
				/>
			</div> 
		</BaseForm>
	);
}
