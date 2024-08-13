"use client";

import React, { useEffect } from "react";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useParams } from "next/navigation";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import Collapse from "./Collapese";
import dynamic from "next/dynamic";
import { handleOnGetRequestFormDetail } from "../service";
import { useForm } from "wcf-component-lib/node_modules/antd/es/form/Form";
import BaseButton from "wcf-component-lib/src/components/BaseButton";

const RequestFormDetail = () => {
	const dispatch: AppDispatch = useDispatch();
	const { uuid } = useParams();
	const { initialValues } = useSelector(
		(state: SliceModel) => ({
			initialValues: state.requestForm.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		if (uuid) dispatch(handleOnGetRequestFormDetail(`${uuid}`));
	}, [uuid]);

	const [form] = useForm();
	return (
		<BaseForm
			name={""}
			form={form}
			initialValues={initialValues}
			child={
				<>
					<Collapse uuid={_.isEmpty(_.trim(`${uuid}`))} />
					<BaseButton
						onClick={() => {
							console.log(form.getFieldValue("requestFormCode"));
						} } label={"ddd"}					/>
				</>
			}
			onFinish={() => {}}
			onFinishFailed={() => {}}
		/>
	);
};
export default dynamic(() => Promise.resolve(RequestFormDetail), {
	ssr: false,
});
