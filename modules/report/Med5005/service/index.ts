import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { Med5005, Med5005Form, Med5005List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5005Grid } from "../../redux";

export const handlePdfButton =
	(med5005: Med5005Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5005 };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5005));
	};
export const handleOnPreview =
	(med5005: Med5005) => async (dispatch: AppDispatch) => {
		const body = { ...med5005.form, pagination: { ...med5005.grid.page } };
		const result = await dispatch(
			handlePreviewDisplay(body, REPORT_TYPES.MED5005)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5005List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5005Grid({ list, page: { ...med5005.grid.page, totalData } })
		);
	};
