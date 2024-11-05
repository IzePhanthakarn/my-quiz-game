import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf, handleOnExportPdfCMP, handlePreviewDisplay, handlePreviewDisplayCMP } from "@/utils/report/common";
import _ from "lodash";
import { Med5003, Med5003Form, Med5003List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5003Grid } from "../../redux";

export const handlePdfButton =
	(med5003: Med5003Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5003 };
		dispatch(handleOnExportPdfCMP(newBody, REPORT_TYPES.MED5003));
	};
export const handleOnPreview =
	(med5003: Med5003) => async (dispatch: AppDispatch) => {
		const body = { ...med5003.form, pagination: { ...med5003.grid.page } };
		const result = await dispatch(
			handlePreviewDisplayCMP(body, REPORT_TYPES.MED5003)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5003List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5003Grid({ list, page: { ...med5003.grid.page, totalData } })
		);
	};
