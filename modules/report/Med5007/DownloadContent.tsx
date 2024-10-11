import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseForm } from "wcf-component-lib/src/components";
import { Med5007Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5007Form } from "../redux";
import { handleOnExportExcel } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";

interface Props {
	med5007: Med5007Form;
	form: FormInstance<Med5007Form>;
	onFinish: FormProps<Med5007Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5007, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5007, REPORT_TYPES.MED5007));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5007));
		}
	}
	return (
		<BaseForm initialValues={med5007} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<MedDropDown
					itemName="hospitalType"
					label="ระดับของสถานพยาบาล"
					type={SESSION_NAME.HOSPITAL_TYPE}
					value={med5007.hospitalType}
					getValue={(value: string) => {
						dispatch(
							setMed5007Form({
								...med5007,
								hospitalType: value,
							})
						);
					}}
				/>
			</div>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<MedDropDown
					itemName="hospitalCategory"
					label="ประเภทของสถานพยาบาล"
					type={SESSION_NAME.HOSPITAL_CATEGORY}
					value={med5007.hospitalCategory}
					getValue={(value: string) => {
						dispatch(
							setMed5007Form({
								...med5007,
								hospitalCategory: value,
							})
						);
					}}
				/>
			</div>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				{!_.isEmpty(med5007.showDownload) ? (
					<div>
						<MedDropDown
							label="ดาวน์โหลด"
							option={DROPDOWN_REPOT}
							value={med5007.downloadType}
							getValue={(value: string) => {
								dispatch(
									setMed5007Form({
										...med5007,
										downloadType: value,
									})
								);
								DownloadChange(value);
							}}
						/>
					</div>
				) : null}
			</div>
		</BaseForm>
	);
}
