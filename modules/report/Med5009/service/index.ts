import { SESSION_NAME } from "@/components/MedDropDown/model";
import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf } from "@/utils/report/common";
import _ from "lodash";
import { LtPropertiesList } from "wcf-component-lib/src/components/BaseDropDown/service/api";
import { Med5009Form } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";

export const handlePdfButton =
	(med5009: Med5009Form) => (dispatch: AppDispatch) => {
		const sessionHospitalType = JSON.parse(
			sessionStorage.getItem(SESSION_NAME.HOSPITAL_TYPE) ?? "[]"
		);
		const findPropertyText = sessionHospitalType.content.find(
			(e: LtPropertiesList) => e.propertyCode === med5009.propertyCode
		);
		let propertyText = "";
		if (!_.isEmpty(findPropertyText)) {
			propertyText = findPropertyText.propertyText;
		} else {
			propertyText = "ทั้งหมด";
		}
		const newBody = { ...med5009, propertyText };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5009));
	};

	
