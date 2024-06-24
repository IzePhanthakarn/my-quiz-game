import React from "react";
import { MenuItem, menuList, SubMenuItem } from "./sidebar-items";
import Link from "next/link";

export default function SidebarContent() {
	return (
		<div>
			{menuList.map((item: MenuItem, index: number) => {
				if (item.isAccordion) {
					return (
						<div key={index}>
							{item.subMenu.map((subItem: SubMenuItem, index: number) => (
								<div key={index}>
									<Link
										className={`px-6 py-2 flex w-full items-center bg-[#214FF3] text-white text-lg ${
											"pathName" === subItem.link &&
											"bg-[#1f41bc] font-semibold"
										}`}
										key={subItem.name}
										href={subItem.link}
									>
										{subItem.name}
									</Link>
								</div>
							))}
						</div>
					);
				}
			})}
		</div>
	);
}

// else {
//     return (
//         <Link
//             className={`px-4 h-[66px] bg-[#214FF3] text-white flex items-center ${
//                 "pathName" === item.link && "bg-[#1f41bc] font-semibold"
//             }`}
//             key={item.header}
//             href={item.link}
//         >
//             <div className="w-full flex items-center space-x-4">
//                 <img src={item.icon} alt="logo" />
//                 <p className="font-semibold">{item.header}</p>
//             </div>
//         </Link>
//     );
// }
