import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf } from "@/utils/report/common";
import _ from "lodash";
import { Med5011Form } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";

export const handlePdfButton =
	(med5011: Med5011Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5011};
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5011));
	};
