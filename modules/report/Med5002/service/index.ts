import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { Med5002, Med5002Form, Med5002List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5002Grid } from "../../redux";

export const handlePdfButton =
	(med5002: Med5002Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5002 };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5002));
	};
export const handleOnPreview =
	(med5002: Med5002) => async (dispatch: AppDispatch) => {
		const body = { ...med5002.form, pagination: { ...med5002.grid.page } };
		const result = await dispatch(
			handlePreviewDisplay(body, REPORT_TYPES.MED5002)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5002List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5002Grid({ list, page: { ...med5002.grid.page, totalData } })
		);
	};
