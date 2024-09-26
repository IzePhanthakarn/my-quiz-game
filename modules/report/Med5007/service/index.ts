import { SESSION_NAME } from "@/components/MedDropDown/model";
import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf } from "@/utils/report/common";
import _ from "lodash";
import { LtPropertiesList } from "wcf-component-lib/src/components/BaseDropDown/service/api";
import { Med5007Form } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";

export const handlePdfButton =
	(med5007: Med5007Form) => (dispatch: AppDispatch) => {
		const sessionHospitalType = JSON.parse(
			sessionStorage.getItem(SESSION_NAME.HOSPITAL_TYPE) ?? "[]"
		);
		const findPropertyText = sessionHospitalType.content.find(
			(e: LtPropertiesList) => e.propertyCode === med5007.hospitalCategory
		);
		let propertyText = "";
		if (!_.isEmpty(findPropertyText)) {
			propertyText = findPropertyText.propertyText;
		} else {
			propertyText = "ทั้งหมด";
		}
		const newBody = { ...med5007, propertyText };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5007));
	};
