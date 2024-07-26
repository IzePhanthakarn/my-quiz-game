"use client";

import React from "react";
import BaseSideBar, {
	MenuItem,
} from "wcf-component-lib/src/components/BaseSideBar";
import ContainerOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/ContainerOutlined";
import { SideBarModule, SubModule, Page } from "./model";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function SideBar() {
	const router: AppRouterInstance = useRouter();
	const [items, setItems] = React.useState<MenuItem[]>([]);
	const [origin, setOrigin] = React.useState<string>("");

	React.useEffect(() => {
		const currentOrigin =  window.location.protocol + "//" + window.location.host;
		setOrigin(currentOrigin);
		const storedData = localStorage.getItem("page_access");
		if (storedData) {
			const parsedData = JSON.parse(storedData) as SideBarModule[];
			const createPageMenuItem = (page: Page): MenuItem => ({
				key: `${page.path}*${page.pageLevel}`,
				label: page.pageName,
			});
			const createSubModuleMenuItem = (subModule: SubModule): MenuItem => ({
				key: subModule.code,
				label: subModule.name,
				children: subModule.pages.map(createPageMenuItem),
			});
			const createModuleMenuItem = (item: SideBarModule): MenuItem => ({
				key: item.moduleCode,
				label: item.moduleName,
				icon: <ContainerOutlined />,
				children: item.subModules.map(createSubModuleMenuItem),
			});
			const sidebarItems: MenuItem[] = parsedData.map(createModuleMenuItem);
			setItems(sidebarItems);
		}
	}, []);

	return (
		<div
			className={`min-w-[280px] h-full bg-[#214FF3] border-r-2 border-[#FFF] flex flex-col `}
		>
			<BaseSideBar
				items={items}
				onMenuClick={(e) => router.push(origin + "/" + e.key)}
			/>
		</div>
	);
}
