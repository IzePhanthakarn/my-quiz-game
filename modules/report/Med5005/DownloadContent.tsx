import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseDatePicker, BaseForm, BaseItemDateRangePicker } from "wcf-component-lib/src/components";
import { Med5005Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5005Form } from "../redux";
import { handleOnExportExcel } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";

interface Props {
	med5005: Med5005Form;
	form: FormInstance<Med5005Form>;
	onFinish: FormProps<Med5005Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5005, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5005, REPORT_TYPES.MED5005));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5005));
		}
	}
	return (
		<BaseForm initialValues={med5005} extraForm={form} onFinish={onFinish}>
			<div>
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<MedDropDown
						itemName="provinceCode"
						label="ระดับของสถานพยาบาล"
						type={SESSION_NAME.SSO_BRANCH_PROVINCE}
						getValue={(e: string) => {
							dispatch(
								setMed5005Form({
									...med5005,
									provinceCode: e,
								})
							);
						}}
					/>
				</div>
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<div>
					<BaseItemDateRangePicker
						itemName="trainDate"
						label="วันที่ฝึกอบรม"
						onChangeRangePicker={(dates: any) => {
							if (dates == null) {
								return;
							}
							return dispatch(
								setMed5005Form({
									...med5005,
									trainFromDate: dates[0],
									trainToDate: dates[1],
								})
							);
						}}
					/>
					</div>					 
					{!_.isEmpty(med5005.showDownload) ? (
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
