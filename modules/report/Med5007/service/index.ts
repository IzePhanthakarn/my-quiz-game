import { SESSION_NAME } from "@/components/MedDropDown/model";
import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf } from "@/utils/report/common";
import _ from "lodash";
import { LtPropertiesList } from "wcf-component-lib/src/components/BaseDropDown/service/api";
import { Med5007Form } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";

export const handlePdfButton =
	(med5007: Med5007Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5007 };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5007));
	};

