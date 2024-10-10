import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { Med5011, Med5011Form, Med5011List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5011Grid } from "../../redux";

export const handlePdfButton =
	(med5011: Med5011Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5011 };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5011));
	};
export const handleOnPreview =
	(med5011: Med5011) => async (dispatch: AppDispatch) => {
		const body = { ...med5011.form, pagination: { ...med5011.grid.page } };
		const result = await dispatch(
			handlePreviewDisplay(body, REPORT_TYPES.MED5011)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5011List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5011Grid({ list, page: { ...med5011.grid.page, totalData } })
		);
	};
