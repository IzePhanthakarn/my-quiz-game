import React from "react";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

export default function Collapse() {
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "ข้อมูลบันทึกใบคำขอค่าตรวจประเมิน",
			children: <Section1 />,
		},
		{
			key: "2",
			label: "ข้อมูลแพทย์ผู้ประเมิน",
			children: <Section2 />,
		},
		{
			key: "3",
			label: "เลขที่ใบคำขอค่าตรวจประเมิน",
			children: <Section3 />,
		},
	];
	return (
		<div className="flex flex-col space-y-2">
			<p className="text-2xl">สืบค้นใบคำขอรับค่าตรวจประเมิน MED01001</p>
			<BaseCollapse items={items} defaultActiveKey={["1", "2", "3"]} />
		</div>
	);
}
