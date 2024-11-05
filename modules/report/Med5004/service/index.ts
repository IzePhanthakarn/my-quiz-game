import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf, handleOnExportPdfCMP, handlePreviewDisplay, handlePreviewDisplayCMP } from "@/utils/report/common";
import _ from "lodash";
import { Med5004, Med5004Form, Med5004List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5004Grid } from "../../redux";

export const handlePdfButton =
	(med5004: Med5004Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5004 };
		dispatch(handleOnExportPdfCMP(newBody, REPORT_TYPES.MED5004));
	};
export const handleOnPreview =
	(med5004: Med5004) => async (dispatch: AppDispatch) => {
		const body = { ...med5004.form, pagination: { ...med5004.grid.page } };
		const result = await dispatch(
			handlePreviewDisplayCMP(body, REPORT_TYPES.MED5004)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5004List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5004Grid({ list, page: { ...med5004.grid.page, totalData } })
		);
	};
