import dayjs from "dayjs";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import { REPORT_PAGES, REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";
import { exportExcelMed, exportPdfMed, ExportReportsParams } from "./api";

export const handleOnExportExcel =
	(body: any, reportType: REPORT_TYPES) => async (dispatch: AppDispatch) => {
		const params: ExportReportsParams = {
			body,
			reportName: REPORT_PAGES[reportType].reportName,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(exportExcelMed(params));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		const blob = new Blob([result.payload], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${REPORT_PAGES[reportType].reportName}_${dayjs().format(
			"YYYY-MM-DD HHmmss"
		)}.xlsx`;
		document.body.appendChild(a);
		a.click();
		URL.revokeObjectURL(url);
	};

export const handleOnExportPdf =
	(body: any, reportType: REPORT_TYPES, isPreview = false) =>
	async (dispatch: AppDispatch) => {
		const params: ExportReportsParams = {
			body,
			reportName: REPORT_PAGES[reportType].reportName,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(exportPdfMed(params));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		const blob = new Blob([result.payload], { type: "application/pdf" });
		const url = URL.createObjectURL(blob);
		if (isPreview) window.open(url, "_blank");
		else {
			const a = document.createElement("a");
			a.href = url;
			a.download = `${REPORT_PAGES[reportType].reportName}_${dayjs().format(
				"YYYY-MM-DD HHmmss"
			)}.pdf`;
			document.body.appendChild(a);
			a.click();
		}
		URL.revokeObjectURL(url);
	};
