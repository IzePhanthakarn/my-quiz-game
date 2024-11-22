import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import {
	BaseDatePicker,
	BaseForm,
	BaseItemDateRangePicker,
} from "wcf-component-lib/src/components";
import { Med5011Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5011Form } from "../redux";
import { handleOnExportExcel, handleOnExportExcelCMP } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";
import { reportRules } from "./field-validation/form";

interface Props {
	med5011: Med5011Form;
	form: FormInstance<Med5011Form>;
	onFinish: FormProps<Med5011Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5011, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5011, REPORT_TYPES.MED5011));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5011));
		}
	}
	return (
		<BaseForm initialValues={med5011} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<div>
					<BaseItemDateRangePicker
						itemName="cancelDate"
						label="วันที่ยกเลิกสถานพยาบาล"
						rules={reportRules.cancelDateSchema}
						onChangeRangePicker={(dates: any) => {
							if (dates == null) {
								return;
							}
							return dispatch(
								setMed5011Form({
									...med5011,
									fromDate: dates[0],
									toDate: dates[1],
								})
							);
						}}
					/>
				</div>
				{!_.isEmpty(med5011.showDownload) ? (
					<div>
						<MedDropDown
							label="ดาวน์โหลด"
							option={DROPDOWN_REPOT}
							value={med5011.downloadType}
							getValue={(value: string) => {
								dispatch(
									setMed5011Form({
										...med5011,
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
