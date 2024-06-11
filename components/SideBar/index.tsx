"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MenuItem, MenuList, menuList, SubMenuItem } from "./sidebar-items";
import { sidebarWidth } from "@/constants/global";

export default function SideBar() {
	const pathName = usePathname();
	return (
		<div
			className={`min-w-[${sidebarWidth}] h-full border-r-2 border-[#00000033] flex flex-col`}
		>
			{menuList.map((item: MenuList, index: number) => (
				<Accordion
					sx={{
						"& .MuiAccordionDetails-root": {
							padding: "0px",
						},
						"&.Mui-expanded": {
							margin: "0px",
						},
					}}
					key={index}
				>
					<AccordionSummary
						className="px-4 h-[66px]"
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1-content"
						id="panel1-header"
					>
						<div className="w-full flex items-center space-x-4">
							<img src={item.icon} alt="logo" />
							<p className="font-semibold">{item.header}</p>
						</div>
					</AccordionSummary>
					{item.menu.map((subItem: MenuItem, index: number) => (
						<AccordionDetails key={index}>
							<div
								className={`p-4 flex w-full items-center  ${
									subItem.menuList.some((item) => item.link === pathName)
										? "bg-[#2195f33a] font-semibold"
										: "font-normal"
								}`}
							>
								<p>{subItem.subHeader}</p>
							</div>

							{subItem.menuList.map((item: SubMenuItem) => (
								<Link
									className={`px-6 py-2 flex w-full items-center  ${
										pathName === item.link && "bg-[#2196F314] font-semibold"
									}`}
									key={item.name}
									href={item.link}
								>
									{item.name}
								</Link>
							))}
						</AccordionDetails>
					))}
				</Accordion>
			))}
		</div>
	);
}
