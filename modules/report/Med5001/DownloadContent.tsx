import React from "react";
import { BaseButton, BaseDatePicker, BaseForm, BaseItemInput } from "wcf-component-lib/src/components";
import { Med5001Form } from "./redux/model";
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
	med5001: Med5001Form;
	form: FormInstance<Med5001Form>;
	onFinish: FormProps<Med5001Form>["onFinish"];
}
export default function DownloadContent(props: Props) {
	const { med5001, form, onFinish } = props;
	const dispatch: AppDispatch = useDispatch();
	function DownloadChange(e: string): any {
		if ("EXCEL" == e) {
			dispatch(handleOnExportExcel(med5001, REPORT_TYPES.MED5001));
		} else if ("PDF" == e) {
			dispatch(handlePdfButton(med5001));
		}
		return e;
	}

	return (
		<BaseForm initialValues={med5001} extraForm={form} onFinish={onFinish}>
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			<BaseItemInput label="รหัสหน่วยงาน"  itemName={"ssoCode"}></BaseItemInput><BaseItemInput label="จังหวัดปลายทาง"  itemName={"provinceCode"}></BaseItemInput>
			</div>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			<BaseDatePicker label="ตั้งแต่วันที่จ่ายเงิน" itemName={"fromDate"}/>
			<BaseDatePicker label="ถึงวันที่" itemName={"toDate"}/>
			</div>
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
		</BaseForm>
	);
}
