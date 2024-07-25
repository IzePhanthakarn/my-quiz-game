"use client";

import React from "react";
import BaseSideBar, {
	MenuItem,
} from "wcf-component-lib/src/components/BaseSideBar";
import ContainerOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/ContainerOutlined";
import { SideBarModule, SubModule, Page } from "./model";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { handleRouterPush } from "@/utils";

export default function SideBar() {
	const router: AppRouterInstance = useRouter();
	const [items, setItems] = React.useState<MenuItem[]>([]);

	React.useEffect(() => {
		const storedData = localStorage.getItem("page_access");
		if (storedData) {
			const parsedData = JSON.parse(storedData) as SideBarModule[];
			// Function to create MenuItem from Page
			const createPageMenuItem = (page: Page): MenuItem => ({
				key: `${page.path}*${page.pageLevel}`,
				label: page.pageName,
			});

			// Function to create MenuItem from SubModule
			const createSubModuleMenuItem = (subModule: SubModule): MenuItem => ({
				key: subModule.code,
				label: subModule.name,
				children: subModule.pages.map(createPageMenuItem),
			});

			// Function to create MenuItem from SideBarModule
			const createModuleMenuItem = (item: SideBarModule): MenuItem => ({
				key: item.moduleCode,
				label: item.moduleName,
				icon: <ContainerOutlined />, // Adjust the icon as needed
				children: item.subModules.map(createSubModuleMenuItem),
			});

			// Main mapping function
			const sidebarItems: MenuItem[] = parsedData.map(createModuleMenuItem);
			console.log("sidebarItems", sidebarItems);
			setItems(sidebarItems);
		}
	}, []);

	return (
		<div
			className={`min-w-[280px] h-full bg-[#214FF3] border-r-2 border-[#FFF] flex flex-col `}
		>
			<BaseSideBar
				items={items}
				onMenuClick={(e) => {
					handleRouterPush(e.key, router);
				}}
			/>
		</div>
	);
}
