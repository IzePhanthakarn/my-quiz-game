import { DataStructureURL } from "wcf-component-lib/src/provider/LayoutProvider/type";

export const configPage: DataStructureURL = {
	doctor: {
		root: {
			url: "/doctor",
			breadcrumb: ["root"],
			text: "แพทย์",
			pageLevel: { form: [0] },
		},
		formEdit: {
			url: "/doctor/edit/[uuid]",
			text: "ข้อมูลแพทย์",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { form: [0] },
		},
		formAdd: {
			url: "/doctor/form",
			text: "เพิ่มข้อมูลแพทย์",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { form: [0] },
		},
	},
	hospital: {
		root: {
			url: "/hospital",
			breadcrumb: ["root"],
			text: "สถานพยาบาล",
			pageLevel: { form: [0] },
		},
		formEdit: {
			url: "/doctor/edit/[uuid]",
			text: "ข้อมูลสถานพยาบาล",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { form: [0] },
		},
		formAdd: {
			url: "/doctor/form",
			text: "เพิ่มข้อมูลสถานพยาบาล",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { form: [0] },
		},
	},
	clinic: {
		root: {
			url: "/clinic",
			breadcrumb: ["root"],
			text: "คลินิก",
			pageLevel: { form: [0] },
		},
	},
	diploma: {
		root: {
			url: "/diploma",
			breadcrumb: ["root"],
			text: "ประกาศนียบัตร",
			pageLevel: { form: [0] },
		},
	},
	list: {
		root: {
			url: "/report/list",
			breadcrumb: ["root"],
			text: "รายการรายงาน",
			pageLevel: { form: [0] },
		},
	},
	med5007: {
		root: {
			url: "/report/med5007",
			breadcrumb: ["root"],
			text: "รายงานชื่อที่อยู่สถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
			pageLevel: { form: [0] },
		},
	},
};
