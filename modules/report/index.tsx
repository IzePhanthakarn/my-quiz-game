import React from "react";
import { handleReportRender } from "./service";

export default function MedReport({
	reportCode,
}: {
	reportCode: string | string[] | undefined;
}) {
	return <div>{handleReportRender(reportCode)}</div>;
}
