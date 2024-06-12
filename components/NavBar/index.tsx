"use client";

import React from "react";

export default function NavBar() {
	return (
		<div className="flex-grow flex bg-gradient-to-l from-[#3f15b7] from-10% via-[#2196f3] via-30% to-[#FFF] to-90% h-[75px] drop-shadow-[0_4px_10px_#0000001A]">
			<div className="flex items-center border-r-2 border-[#00000033] w-[280px] pl-6">
				<img src="/icons/hamburger.svg" alt="logo" />
			</div>
			<div className="flex-grow flex justify-between items-center pl-8 pr-6">
				<div>
					<p className="font-semibold">ระบบงานข้อมูล</p>
				</div>
				<div className="flex space-x-6">
					<img
						className="cursor-pointer"
						src="/icons/notification.svg"
						alt="logo"
					/>
					<img src="/icons/chocolate.svg" alt="logo" />
					<img src="/icons/avatar.svg" alt="logo" />
					<img src="/icons/arrow-down.svg" alt="logo" />
				</div>
			</div>
		</div>
	);
}
