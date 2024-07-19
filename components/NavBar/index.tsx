"use client";

import React from "react";

export default function NavBar() {
	return (
		<div className="flex-grow flex bg-gradient-to-l from-[#214FF3] from-10% via-[#EFAC01] via-30% to-[#FFFFFF] to-90% h-[75px] drop-shadow-[0_4px_10px_#0000001A]">
			<div className="flex items-center bg-white border-r-2 border-[#00000033] w-[280px] pl-6">
				<img src="/med/icons/hamburger.svg" alt="logo" />
				{/* <img src="/images/wcf-logo.jpeg" className="" alt="wcf-logo" /> */}
			</div>
			<div className="flex-grow flex justify-between items-center pl-8 pr-6">
				<div>
					<p className="font-semibold text-4xl">ระบบงานข้อมูล</p>
				</div>
				<div className="flex space-x-6">
					<img
						className="cursor-pointer"
						src="/icons/notification.svg"
						alt="logo"
					/>
					<img src="/med/icons/chocolate.svg" alt="logo" />
					<img src="/med/icons/avatar.svg" alt="logo" />
					<img src="/icons/arrow-down.svg" alt="logo" />
				</div>
			</div>
		</div>
	);
}
