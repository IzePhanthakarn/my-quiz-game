import ReportList from "../List";
import Med5001 from "../Med5001";
import Med5005 from "../Med5005";
import Med5007 from "../Med5007";
import Med5008 from "../Med5008";
import Med5009 from "../Med5009";
import Med5010 from "../Med5010";
import Med5011 from "../Med5011";
import Med5012 from "../Med5012";

export const handleReportRender = (
	reportCode: string | string[] | undefined
) => {
	switch (reportCode) {
		case "list":
			return <ReportList />;
		case "med5001":
			return <Med5001 />;
		case "med5005":
			return <Med5005 />;
		case "med5007":
			return <Med5007 />;
		case "med5008":
			return <Med5008 />;
		case "med5009":
			return <Med5009 />;
		case "med5010":
			return <Med5010 />;
		case "med5011":
			return <Med5011 />;
		case "med5012":
			return <Med5012 />;
		default:
			return <p>Not Found Report</p>;
	}
};
