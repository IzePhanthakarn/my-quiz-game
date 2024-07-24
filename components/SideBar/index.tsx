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

	const handleClick = (path: string) => {
		const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
		if (path) {
			// Remove the basePath if it exists in the path
			const cleanedPath = path.startsWith(basePath ?? "")
				? path.substring(basePath?.length ?? 0)
				: path;

			// Ensure the path starts with a slash
			const finalPath = cleanedPath.startsWith("/")
				? cleanedPath
				: `/${cleanedPath}`;

			// Navigate to the cleaned path
			router.push(finalPath);
		}
	};

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
					handleClick(e.key);
				}}
			/>
		</div>
	);
}
