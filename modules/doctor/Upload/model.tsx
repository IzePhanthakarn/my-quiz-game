import { SESSION_NAME } from "@/components/MedDropDown/model";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";

export const columns: TableProps["columns"] = [
	{
		title: "เลขทะเบียน สปส.",
		dataIndex: "doctorCode",
		key: "doctorCode",
	},
	{
		title: "เลขทะเบียนวิชาชีพ",
		dataIndex: "professionalCode",
		key: "professionalCode",
	},
	{
		title: "ชื่อ-สกุล",
		dataIndex: "firstname",
		key: "firstname",
		render: (_, { firstname, lastname, titlename }) => {
			return (
				<p>
					{titlename}
					{firstname} {lastname}
				</p>
			);
		},
	},
	{
		title: "วุฒิบัตรเฉพาะทาง",
		dataIndex: "diplomaName",
		key: "diplomaName",
	},
	{
		title: "ชื่อโรงพยาบาล",
		dataIndex: "hospitalName",
		key: "hospitalName",
	},
	{
		title: "จังหวัด",
		dataIndex: "hospitalWcfCode",
		key: "hospitalWcfCode",
		width: 200,
		render: (_, { hospitalWcfCode }) => {
			const rawHospital = JSON.parse(
				sessionStorage.getItem(SESSION_NAME.HOSPITAL) ?? "[]"
			);
			const provinceCode = rawHospital.find(
				(e: any) => e.hospitalWcfCode === hospitalWcfCode
			).provinceCode;

			return (
				<p>
					{provinceCode
						? `- ${findLabelAddress(provinceCode, ADDRESS.PROVINCE) ?? "อื่นๆ"}`
						: null}
				</p>
			);
		},
	},
];
