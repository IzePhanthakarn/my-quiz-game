import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf } from "@/utils/report/common";
import _ from "lodash";
import { Med5010Form } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";

export const handlePdfButton =
	(med5010: Med5010Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5010};
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5010));
	};
