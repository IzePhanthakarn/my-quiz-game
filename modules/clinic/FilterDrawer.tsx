import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setClinicFilter } from "./redux";
import { IsActive } from "@/constants/constants";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.clinic.clinicFilter,
		}),
		shallowEqual
	);

	return (
		<BaseColumn className="space-y-4">
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkClinicCode"
					label="รหัสคลินิค"
					checked={filter.checkClinicCode}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setClinicFilter({
								...filter,
								checkClinicCode: !filter.checkClinicCode,
								clinicCodeLike: "",
							})
						)
					}
				/>
				{filter.checkClinicCode && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="clinicCode"
							value={filter.clinicCodeLike}
							onChangeFunction={(e) => {
								dispatch(
									setClinicFilter({
										...filter,
										clinicCodeLike: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkClinicName"
					label="ชื่อคลินิค"
					checked={filter.checkClinicName}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setClinicFilter({
								...filter,
								checkClinicName: !filter.checkClinicName,
								clinicNameLike: "",
							})
						)
					}
				/>
				{filter.checkClinicName && (
					<BaseItemInput
						itemName="clinicName"
						value={filter.clinicNameLike}
						onChangeFunction={(e) => {
							dispatch(
								setClinicFilter({
									...filter,
									clinicNameLike: e.target.value,
								})
							);
						}}
					/>
				)}
			</BaseColumn>
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckboxFilterGroup
					isMainInputChecked={filter.checkIsActive}
					onClickMainInputFunction={() => {
						dispatch(
							setClinicFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setClinicFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setClinicFilter({
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
