import React from "react";
import { BaseDatePicker, BaseForm, BaseItemInput } from "wcf-component-lib/src/components";
import { Med5005Form } from "./redux/model";
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
	med5005: Med5005Form;
	form: FormInstance<Med5005Form>;
	onFinish: FormProps<Med5005Form>["onFinish"];
}
export default function DownloadContent(props: Props) {
	const { med5005, form, onFinish } = props;
	const dispatch: AppDispatch = useDispatch();
	function DownloadChange(e: string): any {
		if ("EXCEL" == e) {
			dispatch(handleOnExportExcel(med5005, REPORT_TYPES.MED5005));
		} else if ("PDF" == e) {
			dispatch(handlePdfButton(med5005));
		}
		return e;
	}

	return (
		<BaseForm initialValues={med5005} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			<BaseItemInput label="รหัสหน่วยงาน"  itemName={"ssoCode"}></BaseItemInput> <BaseItemInput label="จังหวัดปลายทาง"  itemName={"provinceCode"}></BaseItemInput>
			</div>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			<BaseDatePicker label="ตั้งวันที่ฝึกอบรม" itemName={"fromDate"}/>
			</div>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
			<BaseDatePicker label="ถึงวันที่" itemName={"toDate"}/>
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
		</BaseForm>
	);
}
