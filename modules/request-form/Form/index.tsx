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
import { setRequestFormDetail } from "../redux";

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
		<BaseForm
			name={""}
			initialValues={form}
			child={<Collapse uuid={_.isEmpty(uuid)} />}
			onFinish={() => {
				console.log(form);
			}}
			onValuesChange={(e) => dispatch(setRequestFormDetail({ ...form, ...e }))}
		/>
	);
};
export default dynamic(() => Promise.resolve(RequestFormDetail), {
	ssr: false,
});
