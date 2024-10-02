import Med5005 from "../Med5005";
import Med5007 from "../Med5007";
import Med5009 from "../Med5009";
import Med5012 from "../Med5012";

export const handleReportRender = (
	reportCode: string | string[] | undefined
) => {
	switch (reportCode) {
		case "med5005":
			return <Med5005 />;
		case "med5007":
			return <Med5007 />;
		case "med5009":
			return <Med5009 />;
		case "med5012":
			return <Med5012 />;
		default:
			return <p>Not Found Report</p>;
	}
};
