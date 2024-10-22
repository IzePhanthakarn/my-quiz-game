import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseDatePicker, BaseForm, BaseItemInput } from "wcf-component-lib/src/components";
import { Med5002Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5002Form } from "../redux";
import { handleOnExportExcel } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";

interface Props {
	med5002: Med5002Form;
	form: FormInstance<Med5002Form>;
	onFinish: FormProps<Med5002Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5002, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5002, REPORT_TYPES.MED5002));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5002));
		}
	}
	return (
		<BaseForm initialValues={med5002} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<MedDropDown
						type={SESSION_NAME.SSO_BRANCH_PROVINCE_CODENAME}
						label="รหัสหน่วยงาน"
						itemName="ssoCode"
						value={med5002.ssoCode}
						getValue={(value: string) => {
							dispatch(
								setMed5002Form({
									...med5002,
									ssoCode: value,
								})
							);
						}}
					/>
				</div>
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<BaseDatePicker
						notForm={true}
						label="ตั้งแต่วันที่จ่ายเงิน"
						itemName={"fromDate"}
						value={med5002.fromDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5002Form({
									...med5002,
									fromDate: date,
								})
							);
						}}
					/>
					<BaseDatePicker
						notForm={true}
						label="ถึงวันที่"
						value={med5002.toDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5002Form({
									...med5002,
									toDate: date,
								})
							);
						}}
					/>
				
			</div>
            <div className="grid grid-cols-4 gap-x-6 gap-y-5">
			    <BaseItemInput label="รหัสแพทย์" itemName={"doctorCode"} />
					{!_.isEmpty(med5002.showDownload) ? (
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
