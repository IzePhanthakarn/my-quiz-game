import HomeFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/HomeFilled";

export const pathMapping: {
	[key: string]: { name: string; icon: React.ReactNode | null };
} = {
	edit: { name: "แก้ไข", icon: null },
	form: { name: "เพิ่ม", icon: null },
	clinic: { name: "คลีนิค", icon: <HomeFilled /> },
};
