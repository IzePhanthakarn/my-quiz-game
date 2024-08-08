"use client";

import React, { useEffect } from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import FormOne from "./FormOne";
import BaseTabs from "wcf-component-lib/src/components/BaseTabs";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import { TabsProps } from "wcf-component-lib/node_modules/antd/es/tabs";
import Two from "./Two";

const DoctorForm = (params: UuidFormPageProps) => {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "From1",
			children: <FormOne />,
		},
		{
			key: "2",
			label: "From2",
			children: <Two />,
		},
		{
			key: "3",
			label: "From3",
			children: <div>Clinic</div>,
		},
	];

	return (
		<BaseColumn className="bg-white p-2 h-full">
			<BaseTabs defaultActiveKey={"1"} items={items} />
		</BaseColumn>
	);
};
export default dynamic(() => Promise.resolve(DoctorForm), { ssr: false });
