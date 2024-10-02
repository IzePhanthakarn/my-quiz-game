import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf } from "@/utils/report/common";
import _ from "lodash";
import { Med5008Form } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";

export const handlePdfButton =
	(med5008: Med5008Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5008};
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5008));
	};
