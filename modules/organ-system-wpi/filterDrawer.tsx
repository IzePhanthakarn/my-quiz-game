import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormItemCheckbox, FormItemInput } from "wcf-component-lib/src";
import { FormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setOrganSystemWpiFilter } from "./redux";
import { IsActive } from "../../constants/constants";
import _ from "lodash";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.organSystemWpi.filter,
		}),
		shallowEqual
	);

	return (
		<>
			<Column className="space-y-4">
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkOrganSystemNo"
						label="Organ SystemNo"
						checked={filter.checkOrganSystemNo}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setOrganSystemWpiFilter({
									...filter,
									checkOrganSystemNo: !filter.checkOrganSystemNo,
								})
							)
						}
					/>
					{filter.checkOrganSystemNo && (
						<div className=" pt-1">
							<FormItemInput
								itemName="organSystemNoLike"
								value={filter.organSystemNoLike}
								onChangeFunction={(e) => {
									dispatch(
										setOrganSystemWpiFilter({
											...filter,
											organSystemNoLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</Column>
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="checkDescription"
						label="Description"
						checked={filter.checkDescription}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setOrganSystemWpiFilter({
									...filter,
									checkDescription: !filter.checkDescription,
								})
							)
						}
					/>
					{filter.checkDescription && (
						<div className=" pt-1">
							<FormItemInput
								itemName="descriptionLike"
								value={filter.descriptionLike}
								onChangeFunction={(e) => {
									dispatch(
										setOrganSystemWpiFilter({
											...filter,
											descriptionLike: e.target.value,
										})
									);
								}}
							/>
						</div>
					)}
				</Column>
				<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
					<FormItemCheckbox
						itemName="isActive"
						label="สถานะการลบข้อมูล"
						checked={_.trim(filter.isActive) === IsActive.Y ? true : false}
						labelPosition={FormItemPosition.RIGHT}
						onClickFunction={() =>
							dispatch(
								setOrganSystemWpiFilter({
									...filter,
									isActive:
										_.trim(filter.isActive) === IsActive.Y
											? IsActive.N
											: IsActive.Y,
								})
							)
						}
					/>
				</Column>
			</Column>
		</>
	);
}
