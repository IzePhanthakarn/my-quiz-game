import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportExcel, handleOnExportPdf, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { Med5013, Med5013Form, Med5013List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5013Grid } from "../../redux";

export const handlePdfButton =
	(med5013: Med5013Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5013 };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5013));
	};
export const handleOnPreview =
	(med5013: Med5013) => async (dispatch: AppDispatch) => {
		const body = { ...med5013.form, pagination: { ...med5013.grid.page } };
		const result = await dispatch(
			handlePreviewDisplay(body, REPORT_TYPES.MED5013)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5013List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5013Grid({ list, page: { ...med5013.grid.page, totalData } })
		);
	};

 
