export interface SideBarModule {
  moduleCode: string;
  moduleName: string;
  subModules: SubModule[];
}
export interface SubModule {
  code: string;
  name: string;
  pages: Page[];
}
export interface Page {
  pageCode: string;
  pageName: string;
  pageLevel: number;
  path: string;
}

export const data: SideBarModule[] = [
  {
    moduleCode: "MED",
    moduleName: "ระบบงานจ่ายค่าตอบแทนแพทย์",
    subModules: [
      {
        code: "MED001",
        name: "ข้อมูลแพทย์",
        pages: [
          {
            pageCode: "MED001001",
            pageName: "สืบค้น",
            pageLevel: 1,
            path: "/med/doctor",
          },
          {
            pageCode: "MED001002",
            pageName: "แก้ไข",
            pageLevel: 2,
            path: "/med/doctor",
          },
        ],
      },
    ],
  },
];
