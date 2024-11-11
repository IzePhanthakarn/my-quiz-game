"use client";

import React, { useEffect, useState } from "react";
import BaseDropDown, {
	BaseDropDownProps,
} from "wcf-component-lib/src/components/BaseDropDown";
import { Option } from "wcf-component-lib/src/components/BaseDropDown/model";
import { handleSession, handleGetValue } from "./service";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { SESSION_NAME } from "./model";
import "wcf-component-lib/src/scss/variable.scss";

interface MedDropDownProps extends BaseDropDownProps {
	type?: SESSION_NAME;
	queryString?: string;
	bodyRequest?: any;
	helperTextLeft?: string;
	helperTextRight?: string;
}

export default function MedDropDown(props: MedDropDownProps) {
	const {
		option = [],
		placeholder = "โปรดระบุ",
		type = SESSION_NAME.DEFAULT,
		queryString = "",
		bodyRequest,
		getValue = () => {},
		helperTextLeft,
		helperTextRight,
		className,
	} = props;

	const dispatch: AppDispatch = useDispatch();
	const [dropdown, setDropdown] = useState<Option[]>(option);

	useEffect(() => {
		if (_.isEmpty(dropdown) && !_.isEmpty(type)) {
			dispatch(handleSession(type, setDropdown, queryString, bodyRequest));
		}
	}, [dropdown]);

	useEffect(() => {
		if (!_.isEmpty(option)) setDropdown(option);
	}, [option]);

	return (
		<div className="flex flex-col">
			<BaseDropDown
				{...props}
				className={`w-full ${className}`}
				placeholder={placeholder}
				option={dropdown}
				getValue={(e) => getValue(handleGetValue(type, e))}
				size="large"
			/>

			{(helperTextRight || helperTextLeft) && (
				<div
					className={`${
						props.notForm ? "" : "-mt-6"
					} w-full flex justify-between h-4`}
				>
					<>
						<p className="text-help mt-1">{helperTextLeft}</p>
						<p className="text-help mt-1">{helperTextRight}</p>
					</>
				</div>
			)}
		</div>
	);
}
