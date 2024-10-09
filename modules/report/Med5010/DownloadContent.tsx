import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import React from "react";
import { BaseForm } from "wcf-component-lib/src/components";
import { Med5010Form } from "./redux/model";
import { FormInstance } from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setMed5010Form } from "../redux";
import { handleOnExportExcel } from "@/utils/report/common";
import { handlePdfButton } from "./service";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";

interface Props {
	med5010: Med5010Form;
	form: FormInstance<Med5010Form>;
	onFinish: FormProps<Med5010Form>["onFinish"];
}

export default function DownloadContent(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { med5010, form, onFinish } = props;
	function DownloadChange(downloadType: string) {
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5010, REPORT_TYPES.MED5010));
		} else if ("PDF" == downloadType) {
			dispatch(handlePdfButton(med5010));
		}
	}
	return (
		<BaseForm initialValues={med5010} extraForm={form} onFinish={onFinish}>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<MedDropDown
					itemName="hospitalType"
					label="ระดับของสถานพยาบาล"
					type={SESSION_NAME.HOSPITAL_TYPE}
					value={med5010.hospitalType}
					getValue={(value: string) => {
						dispatch(
							setMed5010Form({
								...med5010,
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
					value={med5010.hospitalCategory}
					getValue={(value: string) => {
						dispatch(
							setMed5010Form({
								...med5010,
								hospitalCategory: value,
							})
						);
					}}
				/>
			</div>
			<div className="grid grid-cols-4 gap-x-6 gap-y-5">
				<MedDropDown
					itemName="ssoProject"
					label="โครงการประกันสังคม"
					type={SESSION_NAME.SSO_PROJECT}
					value={med5010.ssoProject}
					getValue={(value) => {
						dispatch(
							setMed5010Form({
								...med5010,
								ssoProject: value,
							})
						);
					}}
				/>
				{!_.isEmpty(med5010.showDownload) ? (
					<div>
						<MedDropDown
							label="ดาวน์โหลด"
							option={DROPDOWN_REPOT}
							value={med5010.downloadType}
							getValue={(value: string) => {
								dispatch(
									setMed5010Form({
										...med5010,
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
