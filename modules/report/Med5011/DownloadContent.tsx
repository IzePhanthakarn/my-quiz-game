import React from "react";
import { BaseDatePicker, BaseForm } from "wcf-component-lib/src/components";
import { Med5011Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT } from "@/components/MedDropDown/model";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { handleOnExportExcel } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";
import { handlePdfButton } from "./service";

interface Props {
	med5011: Med5011Form;
	form: FormInstance<Med5011Form>;
	onFinish: FormProps<Med5011Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const { med5011, form, onFinish } = props;
	const dispatch: AppDispatch = useDispatch();
	function DownloadChange(e: string): any {
		if ("EXCEL" == e) {
			dispatch(handleOnExportExcel(med5011, REPORT_TYPES.MED5011));
		} else if ("PDF" == e) {
			dispatch(handlePdfButton(med5011));
		}
		return e;
	}
	return (
		<BaseForm initialValues={med5011} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<div>
					<BaseDatePicker
						label="วันที่ยกเลิกสถานพยาบาล"
						itemName={"fromDate"}
					/>
				</div>
				<div>
					<BaseDatePicker label="ถึงวันที่" itemName={"toDate"} />
				</div>
				{!_.isEmpty(med5011.showDownload) ? (
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
