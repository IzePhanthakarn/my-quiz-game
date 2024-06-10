"use client";

import React from "react";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import Row from "../Row";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setIsOpenDrawer } from "./redux";
import Column from "../Column";
import Button from "@mui/material/Button";
import { setClinicFilter } from "@/modules/clinic/redux";
import { modelClinicFilter } from "@/modules/clinic/redux/filter/model";
interface Props {
	isOpen: boolean;
	content: React.ReactNode;
	label?: string;
	anchor?: DrawerProps["anchor"];
	bgNone?: boolean;
}

export default function BaseDrawer(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { isOpen, content, label = "ตัวกรอง", anchor, bgNone } = props;
	return (
		<Drawer
			sx={{
				"& .MuiDrawer-paper": {
					width: "360px",
				},
				"& .MuiBackdrop-root": {
					background: bgNone ? "none" : "",
				},
			}}
			anchor={anchor ?? "right"}
			open={isOpen}
		>
			<div className="border-b-2 border-[#00000033] px-6 pt-6 pb-4">
				<Row className="justify-between items-center">
					<p className="text-[28px] leading-[32px] font-bold">{label}</p>
					<img
						onClick={() => dispatch(setIsOpenDrawer(false))}
						src="/icons/mark.svg"
						alt="logo"
						className="cursor-pointer"
					/>
				</Row>
			</div>
			<Column className="p-6">{content}</Column>
			<div className="flex flex-col flex-grow justify-end px-6 py-4">
				<div className="w-full px-6 pt-6 pb-4 ">
					<Row className="justify-center items-center space-x-6">
						<Button
							onClick={() => dispatch(setClinicFilter(modelClinicFilter))}
							className="border-2 w-full border-solid border-[#2196F380]"
						>
							ล้าง
						</Button>
						<Button className="bg-[#2196F3] w-full text-white">ยืนยัน</Button>
					</Row>
				</div>
			</div>
		</Drawer>
	);
}
