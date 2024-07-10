"use client";

import React from "react";
import BaseSideBar from "wcf-component-lib/src/components/BaseSideBar";
import ContainerOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/ContainerOutlined";
import { data, SideBarModule, SubModule, Page } from "./model";
import { useRouter } from "next/navigation";

export default function SideBar() {
	const router = useRouter();
	const items = data.map((item: SideBarModule) => {
		return {
			key: item.moduleCode,
			label: item.moduleName,
			icon: <ContainerOutlined />, // Adjust the icon as needed
			children: item.subModules.map((subModule: SubModule) => ({
				key: subModule.code,
				label: subModule.name,
				children: subModule.pages.map((page: Page) => ({
					key: page.path + "*" + page.pageLevel,
					label: page.pageName,
				})),
			})),
		};
	});
	// const items: CollapseProps["items"] = [
	// 	{
	// 		key: "1",
	// 		label: (
	// 			<div className="px-4 h-[47px] flex items-center bg-[#214FF3] text-white">
	// 				<div className="w-full flex items-center space-x-4">
	// 					<img src="/icons/dns.svg" alt="logo" />
	// 					<p className=" text-lg">Master แพทย์</p>
	// 				</div>
	// 			</div>
	// 		),
	// 		children: <SidebarContent />,
	// 	},
	// ];
	return (
		<div
			className={`min-w-[280px] h-full bg-[#214FF3] border-r-2 border-[#FFF] flex flex-col `}
		>
			<BaseSideBar items={items} onMenuClick={(e) => router.push(e.key)} />
			{/* <Collapse defaultActiveKey={["1"]} items={items} /> */}
		</div>
	);
}
