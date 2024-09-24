import MedReport from "@/modules/report";
import React from "react";

export default function Page({ params }: { params: { reportCode: string } }) {
	return <MedReport reportCode={params.reportCode} />;
}
