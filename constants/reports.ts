export enum REPORT_TYPES {
	MED5008 = "med5008",
	MED5009 = "med5009",
	MED5012 = "med5012",
}

export const REPORT_PAGES = {
	[REPORT_TYPES.MED5008]: {
		reportName: "med5008",
	},
	[REPORT_TYPES.MED5009]: {
		reportName: "med5009",
	},
	[REPORT_TYPES.MED5012]: {
		reportName: "med5012",
	},
};
