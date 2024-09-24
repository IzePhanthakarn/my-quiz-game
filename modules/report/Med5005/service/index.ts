import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf } from "@/utils/report/common";
import _ from "lodash";
import { Med5005Form } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";

export const handlePdfButton =
	(med5005: Med5005Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5005};
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5005));
	};
