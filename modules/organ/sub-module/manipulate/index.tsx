"use client";

import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setIsOpenDrawer } from "@/components/BaseDrawer/redux";
import { LINKS } from "@/constants/links";
import _ from "lodash";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { FilterOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import MasterData from "wcf-component-lib/src/layout/MasterData";
import Input from "antd/es/input";
import { useRouter } from "next/navigation";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import { columns } from "../../columns/manipulate";
import { fetchOrganList } from "./service";
import { setOrganManipulatePagination } from "../../redux";

export default function OrganManipulate() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { organ, isOpen, isLoading } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			isLoading: state.loading.isLoading,
			organ: state.organ.manipulate,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchOrganList(organ));
	}, []);

	return (
		<div>
			<MasterData
				AddLabel="เพิ่มออร์แกน"
				Header="Organ"
				SubHeader="List Organ"
				FilterTextField={<Input className="w-[300px]" />}
				FilterButton={
					<Button
						size="large"
						className="text-xl px-3 py-2"
						onClick={() => dispatch(setIsOpenDrawer(true))}
						icon={<FilterOutlined />}
					>
						ตัวกรอง
					</Button>
				}
				Grid={
					<BaseGrid
						rows={organ.grid.data}
						columns={columns}
						page={organ.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(fetchOrganList({ ...organ, grid:{...organ.grid,page}}));
						}}
					/>
				}
				Drawer={
					<BaseDrawer
						isFilter
						isOpen={isOpen}
						content={<></>}
						setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
						confirmFuntion={() => {}}
					/>
				}
				AddFunction={() => router.push(LINKS.CLINIC.add)}
			/>
		</div>
	);
}
