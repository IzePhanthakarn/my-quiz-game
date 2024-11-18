import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseDatePicker, BaseForm, BaseItemCheckbox, BaseItemDateRangePicker } from "wcf-component-lib/src/components";
import { Med5013Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5013Form } from "../redux";
import { handleOnExportExcel } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";
import { reportRules } from "./field-validation/form";

interface Props {
	med5013: Med5013Form;
	form: FormInstance<Med5013Form>;
	onFinish: FormProps<Med5013Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5013, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5013, REPORT_TYPES.MED5013));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5013));
		}
	}
	return (
		<BaseForm initialValues={med5013} extraForm={form} onFinish={onFinish}>
			<div><div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<BaseItemDateRangePicker
						itemName="payDate"
						label="ช่วงวันที่"
						rules={reportRules.payDateSchema}
						onChangeRangePicker={(dates: any) => {
							if (dates == null) {
								return;
							}
							return dispatch(
								setMed5013Form({
									...med5013,
									fromDate: dates[0],
									toDate: dates[1],
								})
							);
						}}
					/>
					{!_.isEmpty(med5013.showDownload) ? (
						<div>
							<MedDropDown
								label="ดาวน์โหลด"
								option={DROPDOWN_REPOT}
								getValue={(e: string) => {
									DownloadChange(e);
								}}
							/>
						</div>
					) : null}
                </div>				
			</div>
		</BaseForm>
	);
}
