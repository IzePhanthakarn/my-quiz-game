"use client";

import React, { useEffect } from "react";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";

import { getItems } from "./model";
import { BaseCollapse } from "wcf-component-lib/src/components";
import { initGetHistoryHospital } from "./service";

export default function HospitalHistory() {
	const dispatch: AppDispatch = useDispatch();
	const { history, compareList, form } = useSelector(
		(state: SliceModel) => ({
			history: state.hospital.history,
			form: state.hospital.form,
			compareList: state.hospital.history.compareList,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(initGetHistoryHospital(form.uuid));
	}, []);

	return (
		<>
			<div className="flex flex-col">
				{getItems(compareList).map((item) => (
					<BaseCollapse
						noPadding
						key={item.key}
						defaultActiveKey={["1"]}
						items={[item]}
					/>
				))}
			</div>
		</>
	);
}
