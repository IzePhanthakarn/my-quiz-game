"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MenuItem, menuList, SubMenuItem } from "./sidebar-items";

export default function SideBar() {
	const getPathName = usePathname();
	const pathName = `/${getPathName.split("/")[1]}`;

	return (
		<div
			className={`min-w-[280px] h-full bg-[#214FF3] border-r-2 border-[#FFF] flex flex-col`}
		>
			{menuList.map((item: MenuItem, index: number) => {
				if (item.isAccordion) {
					return (
						<Accordion
							sx={{
								"& .MuiAccordionDetails-root": {
									padding: "0px",
								},
								"&.Mui-expanded": {
									margin: "0px",
								},
								"&.MuiPaper-root": { boxShadow: "none" },
								"&:first-of-type": {
									borderTopLeftRadius: "0px",
									borderTopRightRadius: "0px",
								},
								"&:last-of-type": {
									borderBottomLeftRadius: "0px",
									borderBottomRightRadius: "0px",
								},
							}}
							key={index}
						>
							<AccordionSummary
								className="px-4 h-[66px] bg-[#214FF3] text-white"
								expandIcon={<ExpandMoreIcon className="text-white " />}
								aria-controls="panel1-content"
								id="panel1-header"
							>
								<div className="w-full flex items-center space-x-4">
									<img src={item.icon} alt="logo" />
									<p className="font-semibold">{item.header}</p>
								</div>
							</AccordionSummary>
							{item.subMenu.map((subItem: SubMenuItem, index: number) => (
								<AccordionDetails key={index}>
									<Link
										className={`px-6 py-2 flex w-full items-center bg-[#214FF3] text-white ${
											pathName === subItem.link && "bg-[#1f41bc] font-semibold"
										}`}
										key={subItem.name}
										href={subItem.link}
									>
										{subItem.name}
									</Link>
								</AccordionDetails>
							))}
						</Accordion>
					);
				} else {
					return (
						<Link
							className={`px-4 h-[66px] bg-[#214FF3] text-white flex items-center ${
								pathName === item.link && "bg-[#1f41bc] font-semibold"
							}`}
							key={item.header}
							href={item.link}
						>
							<div className="w-full flex items-center space-x-4">
								<img src={item.icon} alt="logo" />
								<p className="font-semibold">{item.header}</p>
							</div>
						</Link>
					);
				}
			})}
		</div>
	);
}
