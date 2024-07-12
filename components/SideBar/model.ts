export interface SideBarModule {
	moduleCode: string;
	moduleName: string;
	subModules: SubModule[];
}
export interface SubModule {
	code: string;
	name: string;
	pages: Page[];
	order: number;
}
export interface Page {
	pageCode: string;
	pageName: string;
	pageLevel: number;
	path: string;
	order: number;
}

export const data: SideBarModule[] = [
	{
		moduleCode: "UMS",
		moduleName: "จัดการผู้ใช้งานระบบ",
		subModules: [
			{
				code: "UMS001",
				name: "Manage Resource",
				order: 1,
				pages: [
					{
						pageCode: "UMS001001",
						pageName: "Manage Resource Group",
						pageLevel: 2,
						path: "/resourceGroup",
						order: 1,
					},
					{
						pageCode: "UMS001002",
						pageName: "Manage Resource",
						pageLevel: 2,
						path: "/resource",
						order: 2,
					},
				],
			},
			{
				code: "UMS002",
				name: "Manage Page",
				order: 2,
				pages: [
					{
						pageCode: "UMS002001",
						pageName: "Manage Module",
						pageLevel: 2,
						path: "/module",
						order: 1,
					},
					{
						pageCode: "UMS002002",
						pageName: "Manage Page",
						pageLevel: 2,
						path: "/page",
						order: 2,
					},
				],
			},
			{
				code: "UMS003",
				name: "Manage User",
				order: 3,
				pages: [
					{
						pageCode: "UMS003001",
						pageName: "Manage User Group",
						pageLevel: 2,
						path: "/userGroup",
						order: 1,
					},
					{
						pageCode: "UMS003002",
						pageName: "Manage User",
						pageLevel: 2,
						path: "/user",
						order: 2,
					},
				],
			},
			{
				code: "UMS004",
				name: "Manage Client",
				order: 4,
				pages: [
					{
						pageCode: "UMS004001",
						pageName: "Manage Client",
						pageLevel: 2,
						path: "/client",
						order: 1,
					},
				],
			},
		],
	},
	{
		moduleCode: "MED",
		moduleName: "ระบบงานจ่ายค่าตอบแทนแพทย์",
		subModules: [
			{
				code: "MED001",
				name: "ข้อมูลแพทย์",
				order: 11,
				pages: [
					{
						pageCode: "MED001001",
						pageName: "ข้อมูลแพทย์",
						pageLevel: 2,
						path: "/med/doctor",
						order: 1,
					},
					{
						pageCode: "MED001002",
						pageName: "รายงานในระบบแพทย์",
						pageLevel: 1,
						path: "/med/doctor-report",
						order: 2,
					},
					{
						pageCode: "MED001002",
						pageName: "รายงานในระบบแพทย์",
						pageLevel: 2,
						path: "/med/doctor-report",
						order: 2,
					},
				],
			},
			{
				code: "MED002",
				name: "สถานพยาบาล",
				order: 12,
				pages: [
					{
						pageCode: "MED002001",
						pageName: "ข้อมูลสถานพยาบาล",
						pageLevel: 2,
						path: "/med/hospital",
						order: 1,
					},
					{
						pageCode: "MED002002",
						pageName: "รายงานสถานพยาบาล",
						pageLevel: 1,
						path: "/med/hospital-report",
						order: 2,
					},
				],
			},
			{
				code: "MED003",
				name: "ข้อมูลตั้งต้น",
				order: 12,
				pages: [
					{
						pageCode: "MED003001",
						pageName: "คลินิค",
						pageLevel: 2,
						path: "/med/master/clinic",
						order: 1,
					},
					{
						pageCode: "MED003002",
						pageName: "วุฒฺบัตร",
						pageLevel: 2,
						path: "/med/master/diploma",
						order: 2,
					},
				],
			},
		],
	},
];
