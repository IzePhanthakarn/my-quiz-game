"use client";

import React from "react";
import ToDoListLayout from "wcf-component-lib/src/layout/ToDoListLayout";
import { Hospital } from "wcf-component-lib/node_modules/iconoir-react";
import { ToDoProps } from "wcf-component-lib/src/components/BaseToDoCard";

export default function ToDoList() {
	const todoList: ToDoProps[] = [
		{
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 7 ใน 30 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: 98,
			abstractImage: (
				<img
					src="https://api-dev-wcf.soilfish.co/mw/api/asset/images/abstractImage1.svg"
					alt="abstractImage1"
				/>
			),
			link: "asd",
			icon: <Hospital className="w-full h-full" />,
		},
		{
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 7 ใน 30 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: 99,
			abstractImage: (
				<img
					src="https://api-dev-wcf.soilfish.co/mw/api/asset/images/abstractImage1.svg"
					alt="abstractImage1"
				/>
			),
			link: "asd",
			icon: <Hospital className="w-full h-full" />,
		},
		{
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 19 ใน 30 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: 100,
			abstractImage: (
				<img
					src="https://api-dev-wcf.soilfish.co/mw/api/asset/images/abstractImage2.svg"
					alt="abstractImage1"
				/>
			),
			link: "asd",
			icon: <Hospital className="w-full h-full" />,
		},
	];

	return (
		<div>
			<ToDoListLayout items={todoList} />
		</div>
	);
}
