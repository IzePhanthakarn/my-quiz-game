import DoctorDetail from "./CollapseOne/Detail";
import Two from "./Two";
import { TabsProps } from "wcf-component-lib/node_modules/antd/es/tabs";

export const itemsTabs: TabsProps["items"] = [
	{
		key: "1",
		label: "รายละเอียดแพทย์",
		children: <DoctorDetail />,
	},
	{
		key: "2",
		label: "ประกาศษนียบัตร",
		children: <Two />,
	},
	{
		key: "3",
		label: "From3",
		children: <Two />,
	},
];
