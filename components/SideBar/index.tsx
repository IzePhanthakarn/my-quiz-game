"use client";

import React from "react";
import BaseSideBar, {
	MenuItem,
} from "wcf-component-lib/src/components/BaseSideBar";
import ContainerOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/ContainerOutlined";
import { SideBarModule, SubModule, Page } from "./model";
import { useRouter } from "next/navigation";

export default function SideBar() {
	const router = useRouter();
	const [items, setItems] = React.useState<MenuItem[]>([]);
	React.useEffect(() => {
		const storedData = localStorage.getItem("page_access");
		if (storedData) {
			const parsedData = JSON.parse(storedData) as SideBarModule[];
			const sidebarItems: MenuItem[] = parsedData.map(
				(item: SideBarModule) => ({
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
				})
			);
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
					router.push(window.location.origin + "/" + e.key);
				}}
			/>
		</div>
	);
}
