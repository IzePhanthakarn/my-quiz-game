import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { Med5010, Med5010Form, Med5010List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5010Grid } from "../../redux";

export const handlePdfButton =
	(med5010: Med5010Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5010 };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5010));
	};
export const handleOnPreview =
	(med5010: Med5010) => async (dispatch: AppDispatch) => {
		const body = { ...med5010.form, pagination: { ...med5010.grid.page } };
		const result = await dispatch(
			handlePreviewDisplay(body, REPORT_TYPES.MED5010)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5010List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5010Grid({ list, page: { ...med5010.grid.page, totalData } })
		);
	};
