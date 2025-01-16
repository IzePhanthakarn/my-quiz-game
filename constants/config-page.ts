import { MedKey } from "@/components/MedDivPermission/model";
import { DataStructureURL } from "wcf-component-lib/src/provider/LayoutProvider/type";

export const configPage: DataStructureURL<MedKey> = {
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
			pageLevel: { form: [2], edit: [2], add: [2], view: [1], delete: [2] },
		},
		formAdd: {
			url: "/doctor/form",
			text: "เพิ่มข้อมูลแพทย์",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { delete: [2] },
		},
		upload: {
			url: "/doctor/upload",
			text: "นำเข้าข้อมูลแพทย์",
			breadcrumb: ["root", "upload"],
			pageLevel: {},
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
			pageLevel: { form: [0], edit: [1, 2], add: [1, 2], admin: [2] },
		},
		formAdd: {
			url: "/hospital/form",
			text: "เพิ่มข้อมูลสถานพยาบาล",
			breadcrumb: ["root", "formAdd"],
			pageLevel: {
				form: [0],
				edit: [1, 2],
				add: [1, 2],
				admin: [2],
			},
		},
		estimateAdd: {
			url: "/hospital/estimate-add",
			text: "ค้นหาการแจ้งผลตรวจประเมินฯ",
			breadcrumb: ["root", "estimateAdd"],
			pageLevel: { form: [0] },
		},
		estimateAddForm: {
			url: "/hospital/estimate-add/form",
			text: "แจ้งผลการตรวจประเมินคุณภาพประจำปี",
			breadcrumb: ["root", "estimateAdd", "estimateAddForm"],
			pageLevel: { form: [0] },
		},

		announcedPriceDetailCategoryMaster: {
			url: "/hospital/announced-price-detail-category-master",
			breadcrumb: ["root", "announcedPriceDetailCategoryMaster"],
			text: "ประเภทราคาประกาศ",
			pageLevel: { form: [0], delete: [2] },
		},
		announcedPriceDetailCategoryMasterEdit: {
			url: "/hospital/announced-price-detail-category-master/edit/[uuid]",
			text: "ข้อมูลประเภทราคาประกาศ",
			breadcrumb: [
				"root",
				"announcedPriceDetailCategoryMaster",
				"announcedPriceDetailCategoryMasterEdit",
			],
			pageLevel: { form: [0], edit: [1, 2], add: [1, 2], admin: [2] },
		},
		announcedPriceDetailCategoryMasterAdd: {
			url: "/hospital/announced-price-detail-category-master/form",
			text: "เพิ่มข้อมูลประเภทราคาประกาศ",
			breadcrumb: [
				"root",
				"announcedPriceDetailCategoryMaster",
				"announcedPriceDetailCategoryMasterAdd",
			],
			pageLevel: {
				form: [0],
				edit: [1, 2],
				add: [1, 2],
				admin: [2],
			},
		},

		announcedPriceDetailMaster: {
			url: "/hospital/announced-price-detail-master",
			breadcrumb: ["root", "announcedPriceDetailMaster"],
			text: "Master ราคาประกาศ",
			pageLevel: { form: [0], delete: [2] },
		},
		announcedPriceDetailMasterEdit: {
			url: "/hospital/announced-price-detail-master/edit/[uuid]",
			text: "ข้อมูล Master ราคาประกาศ",
			breadcrumb: [
				"root",
				"announcedPriceDetailMaster",
				"announcedPriceDetailMasterEdit",
			],
			pageLevel: { form: [0], edit: [0, 1, 2], add: [0, 1, 2], admin: [2] },
		},
		announcedPriceDetailMasterAdd: {
			url: "/hospital/announced-price-detail-master/form",
			text: "เพิ่มข้อมูล Master ราคาประกาศ",
			breadcrumb: [
				"root",
				"announcedPriceDetailMaster",
				"announcedPriceDetailMasterAdd",
			],
			pageLevel: {
				form: [0],
				edit: [0, 1, 2],
				add: [0, 1, 2],
				admin: [2],
			},
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
			pageLevel: { edit: [2], add: [2] },
		},
		formAdd: {
			url: "/medical-amount/form",
			text: "เพิ่มข้อมูลอัตราการจ่ายค่าตอบแทนแพทย์",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { edit: [2], add: [2] },
		},
	},
	clinic: {
		root: {
			url: "/clinic",
			breadcrumb: ["root"],
			text: "คลินิก",
			pageLevel: { form: [0] },
		},
		formEdit: {
			url: "/clinic/edit/[uuid]",
			text: "ข้อมูลคลินิก",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { edit: [2], add: [2] },
		},
		formAdd: {
			url: "/clinic/form",
			text: "เพิ่มข้อมูลคลินิก",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { edit: [2], add: [2] },
		},
	},
	organWpi: {
		root: {
			url: "/organ-wpi",
			breadcrumb: ["root"],
			text: "อวัยวะ",
			pageLevel: { form: [0] },
		},
		formEdit: {
			url: "/organ-wpi/edit/[uuid]",
			text: "ข้อมูลอวัยวะ",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { edit: [2], add: [2] },
		},
		formAdd: {
			url: "/organ-wpi/form",
			text: "เพิ่มข้อมูลอวัยวะ",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { edit: [2], add: [2] },
		},
	},
	diploma: {
		root: {
			url: "/diploma",
			breadcrumb: ["root"],
			text: "วุฒิบัตร",
			pageLevel: { form: [0] },
		},
		formEdit: {
			url: "/diploma/edit/[uuid]",
			text: "ข้อมูลวุฒิบัตร",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { edit: [2], add: [2] },
		},
		formAdd: {
			url: "/diploma/form",
			text: "เพิ่มข้อมูลวุฒิบัตร",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { edit: [2], add: [2] },
		},
	},
	courseCategory: {
		root: {
			url: "/course-category",
			breadcrumb: ["root"],
			text: "คอร์สอบรม",
			pageLevel: { form: [0] },
		},
		formEdit: {
			url: "/course-category/edit/[uuid]",
			text: "ข้อมูลคอร์สอบรม",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { edit: [2], add: [2] },
		},
		formAdd: {
			url: "/course-category/form",
			text: "เพิ่มข้อมูลคอร์สอบรม",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { edit: [2], add: [2] },
		},
	},
	courseOrganSystemGroup: {
		root: {
			url: "/course-organ-system-group",
			breadcrumb: ["root"],
			text: "หมวดหมู่อวัยวะ",
			pageLevel: { form: [0] },
		},
		formEdit: {
			url: "/course-organ-system-group/edit/[uuid]",
			text: "ข้อมูลหมวดหมู่อวัยวะ",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { edit: [2], add: [2] },
		},
		formAdd: {
			url: "/course-organ-system-group/form",
			text: "เพิ่มข้อมูหมวดหมู่อวัยวะ",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { edit: [2], add: [2] },
		},
	},
	ltProperties: {
		root: {
			url: "/lt-properties",
			breadcrumb: ["root"],
			text: "Lt-Properties",
			pageLevel: { form: [0] },
		},
		formEdit: {
			url: "/lt-properties/edit/[uuid]",
			text: "ข้อมูล Lt-Properties",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { edit: [2], add: [2] },
		},
		formAdd: {
			url: "/lt-properties/form",
			text: "เพิ่มข้อมูล Lt-Properties",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { edit: [2], add: [2] },
		},
	},
	courseCertificate: {
		root: {
			url: "/course-certificate",
			breadcrumb: ["root"],
			text: "ใบรับรองหลักสูตร",
			pageLevel: { form: [0] },
		},
		formEdit: {
			url: "/course-certificate/edit/[uuid]",
			text: "ข้อมูลใบรับรองหลักสูตร",
			breadcrumb: ["root", "formEdit"],
			pageLevel: { edit: [2], add: [2] },
		},
		formAdd: {
			url: "/course-certificate/form",
			text: "เพิ่มข้อมูลใบรับรองหลักสูตร",
			breadcrumb: ["root", "formAdd"],
			pageLevel: { edit: [2], add: [2] },
		},
	},
	doctorList: {
		root: {
			url: "/report/doctor-list",
			breadcrumb: ["root"],
			text: "รายงานแพทย์",
			pageLevel: { form: [0] },
		},
	},
	medList: {
		root: {
			url: "/report/med-list",
			breadcrumb: ["root"],
			text: "รายงานค่าตอบแทนแพทย์",
			pageLevel: { form: [0] },
		},
	},
	hospitalList: {
		root: {
			url: "/report/hospital-list",
			breadcrumb: ["root"],
			text: "รายงานสถานพยาบาล",
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
