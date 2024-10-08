import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { Med5008, Med5008Form, Med5008List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5008Grid } from "../../redux";

export const handlePdfButton =
	(med5008: Med5008Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5008 };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5008));
	};
export const handleOnPreview =
	(med5008: Med5008) => async (dispatch: AppDispatch) => {
		const body = { ...med5008.form, pagination: { ...med5008.grid.page } };
		const result = await dispatch(
			handlePreviewDisplay(body, REPORT_TYPES.MED5008)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5008List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5008Grid({ list, page: { ...med5008.grid.page, totalData } })
		);
	};
