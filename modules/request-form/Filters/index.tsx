import React from "react";
import CommonInput from "./CommonInput";

import DrawerInput from "./DrawerInput";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SliceModel } from "@/redux/slices/model";
import { AppDispatch } from "@/redux/config/configStore";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setRequestFormFilter } from "../redux";
import { setIsOpenDrawer } from "@/redux/slices/drawer";
import { handleOnGetRequestFormList } from "../service";

export default function Filters() {
	const dispatch: AppDispatch = useDispatch();
	const { isOpen, requestForm } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.drawer.isOpen,
			requestForm: state.requestForm,
		}),
		shallowEqual
	);
	return (
		<div>
			<BaseForm
				name={""}
				initialValues={requestForm.filter}
				onValuesChange={(e) =>
					dispatch(setRequestFormFilter({ ...requestForm.filter, ...e }))
				}
			>
				<CommonInput />
				<BaseDrawer
					isOpen={isOpen}
					content={<DrawerInput />}
					setIsOpen={(value) => dispatch(setIsOpenDrawer(value))}
				/>
			</BaseForm>
			<div className="flex justify-end space-x-2">
				<BaseButton
					className="w-1/12"
					label="ค้นหา"
					onClick={() => dispatch(handleOnGetRequestFormList(requestForm))}
				/>
				<BaseButton
					className="w-1/12"
					label="ตัวกรอง"
					onClick={() => dispatch(setIsOpenDrawer(true))}
				/>
			</div>
		</div>
	);
}
