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
	const [open, setOpen] = React.useState<boolean>(true);
	React.useEffect(() => {
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
			className={`${
				open ? "min-w-[280px]" : "w-24"
			} h-full bg-[#214FF3] border-r-2 border-[#FFF] flex flex-col `}
		>
			<div className="w-full justify-start flex">
				<button className="bg-red-200 p-2" onClick={() => setOpen(!open)}>
					toggle
				</button>
			</div>
			<BaseSideBar
				items={items}
				onMenuClick={(e) => router.push(`https://dev-wcf.soilfish.co${e.key}`)}
			/>
		</div>
	);
}
