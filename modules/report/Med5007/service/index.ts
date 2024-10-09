import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportPdf, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { Med5007, Med5007Form, Med5007List } from "../redux/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5007Form, setMed5007Grid } from "../../redux";

export const handlePdfButton =
	(med5007: Med5007Form) => (dispatch: AppDispatch) => {
		const newBody = { ...med5007 };
		dispatch(handleOnExportPdf(newBody, REPORT_TYPES.MED5007));
	};
export const handleOnPreview =
	(med5007: Med5007) => async (dispatch: AppDispatch) => {
		const body = { ...med5007.form, pagination: { ...med5007.grid.page } };
		const result = await dispatch(
			handlePreviewDisplay(body, REPORT_TYPES.MED5007)
		);
		if (_.get(result, "error.message") === "Rejected") return;
		const list: Med5007List[] = result?.payload.content;
		const totalData: number = result?.payload.totalElements;
		dispatch(
			setMed5007Grid({ list, page: { ...med5007.grid.page, totalData } })
		);
	};
