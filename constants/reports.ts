export enum REPORT_TYPES {
	MED01001 = "med01001",
	MED5007 = "med5007",
	MED5008 = "med5008",
	MED5009 = "med5009",
	MED5012 = "med5012",
}

export const REPORT_PAGES = {
	[REPORT_TYPES.MED01001]: {
		reportName: "med01001",
		apiPath: "",
	},
	
	[REPORT_TYPES.MED5007]: {
		reportName: "med5007",
		// apiPath: "https://api-dev-wcf.soilfish.co/report/report/list/med5007?page=0&size=1000",
		apiPath: "http://localhost:8090/report/list/med5007?page=0&size=1000",
	},
	[REPORT_TYPES.MED5008]: {
		reportName: "med5008",
		apiPath: "",
	},
	[REPORT_TYPES.MED5009]: {
		reportName: "med5009",
		apiPath:
			"https://api-dev-wcf.soilfish.co/report/report/list?page=0&size=1000",
	},
	[REPORT_TYPES.MED5012]: {
		reportName: "med5012",
		apiPath: "",
	},
};
