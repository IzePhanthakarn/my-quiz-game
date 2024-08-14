import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setDocumentFilter } from "./redux";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.document.filter,
		}),
		shallowEqual
	);

	return (
		<BaseColumn className="space-y-4">
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkDocumentName"
					label="Document Name"
					checked={filter.checkDocumentName}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDocumentFilter({
								...filter,
								checkDocumentName: !filter.checkDocumentName,
								documentNameLike: null,
							})
						)
					}
				/>
				{filter.checkDocumentName && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="documentNameLike"
							value={`${filter.documentNameLike}`}
							onChangeFunction={(e) => {
								dispatch(
									setDocumentFilter({
										...filter,
										documentNameLike: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</BaseColumn>

			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkIsNecessary"
					label="Is Necessary"
					checked={filter.checkIsNecessary}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDocumentFilter({
								...filter,
								checkIsNecessary: !filter.checkIsNecessary,
								isNecessary: null,
							})
						)
					}
				/>
				{filter.checkIsNecessary && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="isNecessary"
							value={`${filter.isNecessary}`}
							onChangeFunction={(e) => {
								dispatch(
									setDocumentFilter({
										...filter,
										isNecessary: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</BaseColumn>

			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkDisabled"
					label="Disabled"
					checked={filter.checkDisabled}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setDocumentFilter({
								...filter,
								checkDisabled: !filter.checkDisabled,
								disabled: null,
							})
						)
					}
				/>
				{filter.checkDisabled && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="disabled"
							value={`${filter.disabled}`}
							onChangeFunction={(e) => {
								dispatch(
									setDocumentFilter({
										...filter,
										disabled: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</BaseColumn>

			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckboxFilterGroup
					isMainInputChecked={filter.checkIsActive}
					onClickMainInputFunction={() => {
						dispatch(
							setDocumentFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setDocumentFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setDocumentFilter({
								...filter,
								isActive: IsActive.N,
							})
						);
					}}
				/>
			</BaseColumn>
		</BaseColumn>
	);
}
