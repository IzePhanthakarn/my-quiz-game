import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdfCMP, handlePreviewDisplayCMP } from "@/utils/report/common";
import _ from "lodash";
import { Med5001, Med5001Form, Med5001List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5001Grid } from "../../redux";

export const handlePdfButton =
	(med5001: Med5001Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5001 };
		dispatch(handleOnExportPdfCMP(newBody, REPORT_TYPES.MED5001));
	};
export const handleOnPreview =
	(med5001: Med5001) => async (dispatch: AppDispatch) => {
		const body = { ...med5001.form, pagination: { ...med5001.grid.page } };
		const result = await dispatch(
			handlePreviewDisplayCMP(body, REPORT_TYPES.MED5001)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5001List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5001Grid({ list, page: { ...med5001.grid.page, totalData } })
		);
	};
