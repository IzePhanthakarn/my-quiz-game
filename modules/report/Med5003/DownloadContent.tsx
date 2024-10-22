import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseDatePicker, BaseForm } from "wcf-component-lib/src/components";
import { Med5003Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5003Form } from "../redux";
import { handleOnExportExcel } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";

interface Props {
	med5003: Med5003Form;
	form: FormInstance<Med5003Form>;
	onFinish: FormProps<Med5003Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5003, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5003, REPORT_TYPES.MED5003));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5003));
		}
	}
	return (
		<BaseForm initialValues={med5003} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<MedDropDown
						type={SESSION_NAME.SSO_BRANCH_PROVINCE_CODENAME}
						label="รหัสหน่วยงาน"
						itemName="ssoCode"
						value={med5003.ssoCode}
						getValue={(value: string) => {
							dispatch(
								setMed5003Form({
									...med5003,
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
						value={med5003.fromDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5003Form({
									...med5003,
									fromDate: date,
								})
							);
						}}
					/>
					<BaseDatePicker
						notForm={true}
						label="ถึงวันที่"
						value={med5003.toDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5003Form({
									...med5003,
									toDate: date,
								})
							);
						}}
					/>
				{!_.isEmpty(med5003.showDownload) ? (
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
