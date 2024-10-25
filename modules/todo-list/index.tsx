"use client";

import React, { useEffect } from "react";
import ToDoListLayout from "wcf-component-lib/src/layout/ToDoListLayout";
import { Hospital } from "wcf-component-lib/node_modules/iconoir-react";
import { ToDoProps } from "wcf-component-lib/src/components/BaseToDoCard";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { Count, initHospitalTodoList } from "./service";
import MedStatus from "@/components/MedStatus";

export default function ToDoList() {
	const dispatch: AppDispatch = useDispatch();
	const [count, setCount] = React.useState<Count>({
		sp7end30: 0,
		sp7end90: 0,
		sp19end30: 0,
		sp19end90: 0,
	});
	useEffect(() => {
		dispatch(initHospitalTodoList(setCount));
	}, []);

	const todoList: ToDoProps[] = [
		{
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 7 ใน 30 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: count.sp7end30,
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
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 7 ใน 90 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: count.sp7end90,
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
			total: count.sp19end30,
			abstractImage: (
				<img
					src="https://api-dev-wcf.soilfish.co/mw/api/asset/images/abstractImage2.svg"
					alt="abstractImage1"
				/>
			),
			link: "asd",
			icon: <Hospital className="w-full h-full" />,
		},
		{
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 19 ใน 90 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: count.sp19end90,
			abstractImage: (
				<img
					src="https://api-dev-wcf.soilfish.co/mw/api/asset/images/abstractImage2.svg"
					alt="abstractImage1"
				/>
			),
			// link: "asd",
			onClick: () => {
				console.log("hello");
			},
			icon: <Hospital className="w-full h-full" />,
		},
	];

	return (
		<div>
			<MedStatus type="แพทย์" />
			<MedStatus type="N" />
			<ToDoListLayout items={todoList} />
		</div>
	);
}
