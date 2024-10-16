import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseForm } from "wcf-component-lib/src/components";
import { Med5009Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import _ from "lodash";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5009Form } from "../redux";
import { handleOnExportExcel } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";
import { handlePdfButton } from "./service";

interface Props {
	med5009: Med5009Form;
	form: FormInstance<Med5009Form>;
	onFinish: FormProps<Med5009Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5009, form, onFinish } = props;
	function DownloadChange( downloadType: string) { 
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5009, REPORT_TYPES.MED5009));
		} else if ("PDF" ==downloadType) {
			dispatch(handlePdfButton(med5009));
		}
	}
	return (
		<BaseForm initialValues={med5009} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<MedDropDown
					itemName="propertyCode"
					label="ระดับของสถานพยาบาล"
					type={SESSION_NAME.HOSPITAL_TYPE}
				/>
				{!_.isEmpty(med5009.showDownload) ? (
				 		<div>
				 			<MedDropDown
				 				label="ดาวน์โหลด"
				 				option={DROPDOWN_REPOT}
				 				value={med5009.downloadType}
								getValue={(value: string) => {
				 					dispatch(
				 						setMed5009Form({
				 							...med5009,
				 							downloadType: value,
										})
				 					 );
				 					DownloadChange(value);
									
				 				}}
				 			/>
						</div>
				 	) : null}
			</div>
		</BaseForm>
	);
}
