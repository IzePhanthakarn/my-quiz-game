import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseDatePicker, BaseForm } from "wcf-component-lib/src/components";
import { Med5001Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5001Form } from "../redux";
import { handleOnExportExcel } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";

interface Props {
	med5001: Med5001Form;
	form: FormInstance<Med5001Form>;
	onFinish: FormProps<Med5001Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5001, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5001, REPORT_TYPES.MED5001));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5001));
		}
	}
	return (
		<BaseForm initialValues={med5001} extraForm={form} onFinish={onFinish}>
			<div>
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<MedDropDown
						type={SESSION_NAME.SSO_BRANCH_PROVINCE_CODENAME}
						label="รหัสหน่วยงาน"
						itemName="ssoCode"
						value={med5001.ssoCode}
						getValue={(value: string) => {
							dispatch(
								setMed5001Form({
									...med5001,
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
						value={med5001.fromDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5001Form({
									...med5001,
									fromDate: date,
								})
							);
						}}
					/>
					<BaseDatePicker
						notForm={true}
						label="ถึงวันที่"
						value={med5001.toDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5001Form({
									...med5001,
									toDate: date,
								})
							);
						}}
					/>
					{!_.isEmpty(med5001.showDownload) ? (
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
