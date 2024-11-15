import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseForm, BaseItemDateRangePicker } from "wcf-component-lib/src/components";
import { Med5004Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5004Form } from "../redux";
import { handleOnExportExcelCMP } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";
import { reportRules } from "./field-validation/form";

interface Props {
	med5004: Med5004Form;
	form: FormInstance<Med5004Form>;
	onFinish: FormProps<Med5004Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5004, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcelCMP(med5004, REPORT_TYPES.MED5004));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5004));
		}
	}
	return (
		<BaseForm initialValues={med5004} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<MedDropDown
						type={SESSION_NAME.SSO_BRANCH_PROVINCE_CODENAME}
						label="รหัสหน่วยงาน"
						itemName="ssoCode"
						value={med5004.ssoCode}
						rules={reportRules.ssoCodeSchema}
						getValue={(value: string) => {
							dispatch(
								setMed5004Form({
									...med5004,
									ssoCode: value,
								})
							);
						}}
					/>
				</div>
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">					 
					<BaseItemDateRangePicker
						itemName="payDate"
						label="วันที่จ่ายเงิน"
						onChangeRangePicker={(dates: any) => {
							if (dates == null) {
								return;
							}
							return dispatch(
								setMed5004Form({
									...med5004,
									fromDate: dates[0],
									toDate: dates[1],
								})
							);
						}}
					/>		
				{!_.isEmpty(med5004.showDownload) ? (
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
		</BaseForm>
	);
}
