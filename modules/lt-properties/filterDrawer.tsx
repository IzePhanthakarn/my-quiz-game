import Column from "@/components/Column";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setLtPropertiesFilter } from "./redux";
import { IsActive } from "../../constants/constants";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.ltProperties.filter,
		}),
		shallowEqual
	);

	return (
		<Column className="space-y-4">
			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkProptertyCode"
					label="Propterty Code"
					checked={filter.checkProptertyCode}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setLtPropertiesFilter({
								...filter,
								checkProptertyCode: !filter.checkProptertyCode,
							})
						)
					}
				/>
				{filter.checkProptertyCode && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="propertyCodeLike"
							value={`${filter.propertyCodeLike}`}
							onChangeFunction={(e) => {
								dispatch(
									setLtPropertiesFilter({
										...filter,
										propertyCodeLike: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</Column>
			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkGroupName"
					label="Group Name"
					checked={filter.checkGroupName}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setLtPropertiesFilter({
								...filter,
								checkGroupName: !filter.checkGroupName,
							})
						)
					}
				/>
				{filter.checkGroupName && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="groupNameLike"
							value={`${filter.groupNameLike}`}
							onChangeFunction={(e) => {
								dispatch(
									setLtPropertiesFilter({
										...filter,
										groupNameLike: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</Column>

			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkProptertyText"
					label="Propterty Text"
					checked={filter.checkProptertyText}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setLtPropertiesFilter({
								...filter,
								checkProptertyText: !filter.checkProptertyText,
							})
						)
					}
				/>
				{filter.checkProptertyText && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="propertyTextLike"
							value={`${filter.propertyTextLike}`}
							onChangeFunction={(e) => {
								dispatch(
									setLtPropertiesFilter({
										...filter,
										propertyTextLike: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</Column>

			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkSortingOrder"
					label="Sorting Order"
					checked={filter.checkSortingOrder}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setLtPropertiesFilter({
								...filter,
								checkSortingOrder: !filter.checkSortingOrder,
							})
						)
					}
				/>
				{filter.checkSortingOrder && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="sortingOrder"
							value={`${filter.sortingOrder}`}
							onChangeFunction={(e) => {
								dispatch(
									setLtPropertiesFilter({
										...filter,
										sortingOrder: parseInt(e.target.value),
									})
								);
							}}
						/>
					</div>
				)}
			</Column>

			<Column className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkDescription"
					label="Description"
					checked={filter.checkDescription}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setLtPropertiesFilter({
								...filter,
								checkDescription: !filter.checkDescription,
							})
						)
					}
				/>
				{filter.checkDescription && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="descriptionLike"
							value={`${filter.descriptionLike}`}
							onChangeFunction={(e) => {
								dispatch(
									setLtPropertiesFilter({
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
				<BaseItemCheckboxFilterGroup
					isMainInputChecked={filter.checkIsActive}
					onClickMainInputFunction={() => {
						dispatch(
							setLtPropertiesFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setLtPropertiesFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setLtPropertiesFilter({
								...filter,
								isActive: IsActive.N,
							})
						);
					}}
				/>
			</Column>
		</Column>
	);
}
