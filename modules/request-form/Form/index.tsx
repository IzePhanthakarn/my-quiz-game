"use client";

import React, { useEffect } from "react";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useParams } from "next/navigation";
import { BaseFormMaster } from "wcf-component-lib/src/components/BaseFormMaster";
import Collapse from "./Collapese";
import dynamic from "next/dynamic";
import { handleOnGetRequestFormDetail } from "../service";

const RequestFormDetail = () => {
	const dispatch: AppDispatch = useDispatch();
	const { uuid } = useParams();
	const { form } = useSelector(
		(state: SliceModel) => ({
			form: state.requestForm.form,
		}),
		shallowEqual
	);

	useEffect(() => {
		if (uuid) dispatch(handleOnGetRequestFormDetail(`${uuid}`));
	}, [uuid]);

	return (
		<BaseFormMaster
			name={""}
		
			initialValues={form}
			child={<Collapse />}
			isActiveSection={undefined}
			onFinish={() => {}}
			onFinishFailed={() => {}}
		/>
	);
};
export default dynamic(() => Promise.resolve(RequestFormDetail), {
	ssr: false,
});
