import { DataStructureURL } from "wcf-component-lib/src/provider/LayoutProvider/type";

export const configPage: DataStructureURL = {
	doctor: {
		root: {
			url: "/doctor",
			breadcrumb: ["root"],
			text: "แพทย์",
			pageLevel: { delete: [1, 2] },
		},
		formEdit: {
			url: "/doctor/edit/[uuid]",
			text: "ข้อมูลแพทย์",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { form: [2], edit: [2], view: [1], delete: [2] },
		},
		formAdd: {
			url: "/doctor/form",
			text: "เพิ่มข้อมูลแพทย์",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { delete: [2] },
		},
	},
	hospital: {
		root: {
			url: "/hospital",
			breadcrumb: ["root"],
			text: "สถานพยาบาล",
			pageLevel: { form: [0], delete: [2] },
		},
		formEdit: {
			url: "/hospital/edit/[uuid]",
			text: "ข้อมูลสถานพยาบาล",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { form: [0] },
		},
		formAdd: {
			url: "/hospital/form",
			text: "เพิ่มข้อมูลสถานพยาบาล",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { form: [0] },
		},
		estimateAdd: {
			url: "/hospital/estimate-add",
			text: "แจ้งผลการตรวจประเมิณคุณภาพประจำปี",
			breadcrumb: ["root", "estimateAdd"],
			pageLevel: { form: [0] },
		},
	},
	medicalAmount: {
		root: {
			url: "/medical-amount",
			breadcrumb: ["root"],
			text: "อัตราการจ่ายค่าตอบแทนแพทย์",
			pageLevel: {},
		},
		formEdit: {
			url: "/medical-amount/edit/[uuid]",
			text: "ข้อมูลอัตราการจ่ายค่าตอบแทนแพทย์",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { edit: [2] },
		},
		formAdd: {
			url: "/medical-amount/form",
			text: "เพิ่มข้อมูลอัตราการจ่ายค่าตอบแทนแพทย์",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { edit: [2] },
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
	med5001: {
		root: {
			url: "/report/med5001",
			breadcrumb: ["root"],
			text: "ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ",
			pageLevel: { form: [0] },
		},
	},
	med5002: {
		root: {
			url: "/report/med5002",
			breadcrumb: ["root"],
			text: "ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ(รายบุคคน)",
			pageLevel: { form: [0] },
		},
	},
	med5003: {
		root: {
			url: "/report/med5003",
			breadcrumb: ["root"],
			text: "รายงานใบสั่งจ่ายค้างจ่าย",
			pageLevel: { form: [0] },
		},
	},
	med5004: {
		root: {
			url: "/report/med5004",
			breadcrumb: ["root"],
			text: "รายงานใบเรียกเงินคืนที่ยังไม่ได้รับคืน",
			pageLevel: { form: [0] },
		},
	},
	med5005: {
		root: {
			url: "/report/med5005",
			breadcrumb: ["root"],
			text: "รายงานทะเบียนรายชื่อแพทย์ผู้ประเมินการสูญเสียสมรรถภาพทางกายและจิตใจของสำนักงานประกันสังคม",
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
	med5008: {
		root: {
			url: "/report/med5008",
			breadcrumb: ["root"],
			text: "รายงานวันสิ้นสุดใบอนุญาตสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
			pageLevel: { form: [0] },
		},
	},
	med5009: {
		root: {
			url: "/report/med5009",
			breadcrumb: ["root"],
			text: "รายงานจำนวนสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
			pageLevel: { form: [0] },
		},
	},
	med5010: {
		root: {
			url: "/report/med5010",
			breadcrumb: ["root"],
			text: "รายงานชื่อสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
			pageLevel: { form: [0] },
		},
	},
	med5011: {
		root: {
			url: "/report/med5011",
			breadcrumb: ["root"],
			text: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
			pageLevel: { form: [0] },
		},
	},
	med5012: {
		root: {
			url: "/report/med5012",
			breadcrumb: ["root"],
			text: "รายงานการตรวจสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
			pageLevel: { form: [0] },
		},
	},
	med5013: {
		root: {
			url: "/report/med5013",
			breadcrumb: ["root"],
			text: "รายงานโรงพยาบาลที่อยู่ในระบบประกันสังคม",
			pageLevel: { form: [0] },
		},
	},
};
