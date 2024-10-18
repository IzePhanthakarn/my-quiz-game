import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseDatePicker, BaseForm } from "wcf-component-lib/src/components";
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
			<div>
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<MedDropDown
						itemName="provinceCode"
						label="ระดับของสถานพยาบาล"
						type={SESSION_NAME.SSO_BRANCH_PROVINCE}
						
						getValue={(e: string) => {
							dispatch(setMed5013Form({
								...med5013,
								provinceCode: e,
							}))
						}}
					/>
				</div>
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<BaseDatePicker
						notForm={true}
						label="ตั้งวันที่ฝึกอบรม"
						value={med5013.trainFromDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5013Form({
									...med5013,
									trainFromDate: date,
								})
							);
						}}
					/>
				</div>
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<BaseDatePicker
						notForm={true}
						label="ถึงวันที่"
						value={med5013.trainToDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5013Form({
									...med5013,
									trainToDate: date,
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
