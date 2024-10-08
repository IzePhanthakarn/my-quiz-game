import React from "react";
import { BaseForm } from "wcf-component-lib/src/components";
import { Med5007Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import { handleOnExportExcel } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { handlePdfButton } from "./service";

interface Props {
	med5007: Med5007Form;
	form: FormInstance<Med5007Form>;
	onFinish: FormProps<Med5007Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const { med5007, form, onFinish } = props;
	const dispatch: AppDispatch = useDispatch();
	function DownloadChange(e: string): any {
		if ("EXCEL" == e) {
			dispatch(handleOnExportExcel(med5007, REPORT_TYPES.MED5007));
		} else if ("PDF" == e) {
			dispatch(handlePdfButton(med5007));
		}
		return e;
	}
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
			{!_.isEmpty(med5007.showDownload) ? (
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<MedDropDown
						label="ดาวน์โหลด"
						option={DROPDOWN_REPOT}
						getValue={(e: string) => {
							DownloadChange(e);
						}}
					/>
				</div>
			) : null}
		</BaseForm>
	);
}
