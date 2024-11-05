import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT } from "@/components/MedDropDown/model";
import React from "react";
import {
	BaseDatePicker,
	BaseForm,
	BaseItemDateRangePicker,
} from "wcf-component-lib/src/components";
import { Med5008Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5008Form } from "../redux";
import { handleOnExportExcel } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";

interface Props {
	med5008: Med5008Form;
	form: FormInstance<Med5008Form>;
	onFinish: FormProps<Med5008Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5008, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5008, REPORT_TYPES.MED5008));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5008));
		}
	}
	return (
		<BaseForm initialValues={med5008} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<div>
					<BaseItemDateRangePicker
						itemName="sp7Date"
						label="วันที่ยกเลิกสถานพยาบาล (สพ.7)"
						onChangeRangePicker={(dates: any) => {
							if (dates == null) {
								return;
							}
							return dispatch(
								setMed5008Form({
									...med5008,
									sp7expiredFrom: dates[0],
									sp7expiredTo: dates[1],
								})
							);
						}}
					/>
				</div>
			</div>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<div>
					<BaseItemDateRangePicker
						itemName="sp19Date"
						label="วันที่ยกเลิกสถานพยาบาล (สพ.19)"
						onChangeRangePicker={(dates: any) => {
							if (dates == null) {
								return;
							}
							return dispatch(
								setMed5008Form({
									...med5008,
									sp19expiredFrom: dates[0],
									sp19expiredTo: dates[1],
								})
							);
						}}
					/>
				</div>
				{!_.isEmpty(med5008.showDownload) ? (
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
