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
	clinic: {
		root: {
			url: "/clinic",
			breadcrumb: ["root"],
			text: "คลีนิค",
			pageLevel: { form: [0] },
		},
	},
};
