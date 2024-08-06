import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseItemCheckboxFilterGroup from "wcf-component-lib/src/components/BaseItemCheckboxFilterGroup/BaseItemCheckboxFilterGroup";

import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { setMedicalAmountFilter } from "./redux";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";

export default function FilterDrawer() {
	const dispatch: AppDispatch = useDispatch();
	const { filter } = useSelector(
		(state: SliceModel) => ({
			filter: state.medicalAmount.filter,
		}),
		shallowEqual
	);

	return (
		<BaseColumn className="space-y-4">
			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkAmount"
					label="Amount"
					checked={filter.checkAmount}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setMedicalAmountFilter({
								...filter,
								checkAmount: !filter.checkAmount,
							})
						)
					}
				/>
				{filter.checkAmount && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="amount"
							value={`${filter.amount}`}
							onChangeFunction={(e) => {
								dispatch(
									setMedicalAmountFilter({
										...filter,
										amount: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</BaseColumn>

			{/* <BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkFareAmount"
					label="Fare Amount"
					checked={filter.checkFareAmount}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setMedicalAmountFilter({
								...filter,
								checkFareAmount: !filter.checkFareAmount,
							})
						)
					}
				/>
				{filter.checkFareAmount && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="fareAmount"
							value={filter.fareAmount}
							onChangeFunction={(e) => {
								dispatch(
									setMedicalAmountFilter({
										...filter,
										fareAmount: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</BaseColumn> */}

			{/* <BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkAmountLimit"
					label="Amount Limit"
					checked={filter.checkAmountLimit}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setMedicalAmountFilter({
								...filter,
								checkAmountLimit: !filter.checkAmountLimit,
							})
						)
					}
				/>
				{filter.checkAmountLimit && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="amountLimit"
							value={filter.amountLimit}
							onChangeFunction={(e) => {
								dispatch(
									setMedicalAmountFilter({
										...filter,
										amountLimit: e.target.value,
									})
								);
							}}
						/>
					</div>
				)}
			</BaseColumn> */}

			<BaseColumn className="py-2 px-3 border-2 border-[#DBE4F199] rounded-md">
				<BaseItemCheckbox
					itemName="checkNotice"
					label="Notice"
					checked={filter.checkNotice}
					labelPosition={BaseFormItemPosition.RIGHT}
					onClickFunction={() =>
						dispatch(
							setMedicalAmountFilter({
								...filter,
								checkNotice: !filter.checkNotice,
							})
						)
					}
				/>
				{filter.checkNotice && (
					<div className=" pt-1">
						<BaseItemInput
							itemName="noticeLike"
							value={`${filter.noticeLike}`}
							onChangeFunction={(e) => {
								dispatch(
									setMedicalAmountFilter({
										...filter,
										noticeLike: e.target.value,
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
							setMedicalAmountFilter({
								...filter,
								checkIsActive: !filter.checkIsActive,
								isActive: undefined,
							})
						);
					}}
					subInputValue={filter.isActive}
					onClickSubInputYFunction={() => {
						dispatch(
							setMedicalAmountFilter({
								...filter,
								isActive: IsActive.Y,
							})
						);
					}}
					onClickSubInputNFunction={() => {
						dispatch(
							setMedicalAmountFilter({
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
