import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { Med5012, Med5012Form, Med5012List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5012Grid } from "../../redux";

export const handleOnPreview =
	(med5012: Med5012) => async (dispatch: AppDispatch) => {
		const body = { ...med5012.form, pagination: { ...med5012.grid.page } };
		const result = await dispatch(
			handlePreviewDisplay(body, REPORT_TYPES.MED5012)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5012List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5012Grid({ list, page: { ...med5012.grid.page, totalData } })
		);
	};
	export const handlePdfButton =
	(med5012: Med5012Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5012 };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5012));
	};