import React from "react";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import Detail from "./Detail";

export default function FormOne() {
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "Form One",
			children: <Detail />,
		},
	];
	return (
		<div className="flex flex-col space-y-2">
			<BaseCollapse items={items} defaultActiveKey={"1"} />
			{/* <BaseCollapse items={items} defaultActiveKey={"1"} /> */}
		</div>
	);
}
