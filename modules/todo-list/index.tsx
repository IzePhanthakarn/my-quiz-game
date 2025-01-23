"use client";

import React, { useEffect } from "react";
import ToDoListLayout from "wcf-component-lib/src/layout/ToDoListLayout";
import { Hospital } from "wcf-component-lib/node_modules/iconoir-react";
import { ToDoProps } from "wcf-component-lib/src/components/BaseToDoCard";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Count, handleClick, initHospitalTodoList } from "./service";
import { SliceModel } from "@/redux/slices/model";
import { useRouter } from "next/navigation";
import { setHospitalFilter } from "../hospital/redux";
import { modelHospitalFilter } from "../hospital/redux/models/hospitalModel";
import { getSsoUserList } from "@/utils/sso-user";
import ToolTipUser from "@/components/ToolTipUser";

export default function ToDoList() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const [count, setCount] = React.useState<Count>({
		sp7end30: 0,
		sp7end90: 0,
		sp19end30: 0,
		sp19end90: 0,
	});
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.hospital.filter,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(setHospitalFilter(modelHospitalFilter));
		dispatch(initHospitalTodoList(setCount));
	}, []);

	const todoList: ToDoProps[] = [
		{
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 7 ใน 30 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: count.sp7end30,
			disable: count.sp7end30 === 0,
			abstractImage: (
				<img
					src={`${process.env.NEXT_PUBLIC_MIDDLEWARE_PATH}abstractImage1.svg`}
					alt="abstractImage1"
				/>
			),
			onClick: () => {
				dispatch(handleClick(30, filter, router, true));
			},
			icon: <Hospital className="w-full h-full" />,
		},
		{
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 7 ใน 90 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: count.sp7end90,
			disable: count.sp7end90 === 0,
			abstractImage: (
				<img
					src={`${process.env.NEXT_PUBLIC_MIDDLEWARE_PATH}abstractImage1.svg`}
					alt="abstractImage1"
				/>
			),
			onClick: () => {
				dispatch(handleClick(90, filter, router, true));
			},
			icon: <Hospital className="w-full h-full" />,
		},
		{
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 19 ใน 30 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: count.sp19end30,
			disable: count.sp19end30 === 0,
			abstractImage: (
				<img
					src={`${process.env.NEXT_PUBLIC_MIDDLEWARE_PATH}abstractImage2.svg`}
					alt="abstractImage1"
				/>
			),
			onClick: () => {
				dispatch(handleClick(30, filter, router, false));
			},
			icon: <Hospital className="w-full h-full" />,
		},
		{
			headText: "รพ สิ้นสุด ใบอนุญาต สพ 19 ใน 90 วัน",
			subText: "ติดต่อสอบถามเพิ่มเติม",
			total: count.sp19end90,
			disable: count.sp19end90 === 0,
			abstractImage: (
				<img
					src={`${process.env.NEXT_PUBLIC_MIDDLEWARE_PATH}abstractImage2.svg`}
					alt="abstractImage1"
				/>
			),
			onClick: () => {
				dispatch(handleClick(90, filter, router, false));
			},
			icon: <Hospital className="w-full h-full" />,
		},
	];

	return (
		<div>
			{/* <button
				className="bg-green-300"
				onClick={() => dispatch(getSsoUserList("sjittikhun2"))}
			>
				Test APi SSO_USER
			</button>
			<ToolTipUser name={"molpapha"} /> */}
			<ToDoListLayout items={todoList} />
		</div>
	);
}
