import { TabsProps } from "wcf-component-lib/node_modules/antd/es/tabs";
import DoctorHospital from "../tables/DoctorHospital";
import DoctorDetail from "../tables/DoctorDetail";
import DoctorBank from "../tables/DoctorBank";
import Training from "../tables/Training";

export const itemsTables: TabsProps["items"] = [
	{
		key: "1",
		label: "สังกัดโรงพยาบาล",
		children: <DoctorHospital />,
	},
	{
		key: "2",
		label: "ข้อมูลวุฒิบัตรเฉพาะทาง",
		children: <DoctorDetail />,
	},
	{
		key: "3",
		label: "รายละเอียดการจ่าย",
		children: <DoctorBank />,
	},
	{
		key: "4",
		label: "ข้อมูลการอบรม",
		children: <Training />,
	},
];

export const itemsDoctorHospital: TabsProps["items"] = [
	{
		key: "1",
		label: "สังกัดโรงพยาบาล",
		children: <DoctorHospital />,
	},
];

export const itemsDoctorDetail: TabsProps["items"] = [
	{
		key: "2",
		label: "ข้อมูลวุฒิบัตรเฉพาะทาง",
		children: <DoctorDetail />,
	},
];

export const itemsDoctorBank: TabsProps["items"] = [
	{
		key: "3",
		label: "รายละเอียดการจ่าย",
		children: <DoctorBank />,
	},
];

export const itemsTraining: TabsProps["items"] = [
	{
		key: "4",
		label: "ข้อมูลการอบรม",
		children: <Training />,
	},
];
