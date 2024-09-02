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
import { DROPDOWN_TYPE } from "wcf-component-lib/src/constants/dropdown";

interface MedDropDownProps extends BaseDropDownProps {
	type: DROPDOWN_TYPE;
	queryString?: string;
	bodyRequest?: any;
}

export default function MedDropDown(props: MedDropDownProps) {
	const {
		option = [],
		placeholder = "โปรดระบุ",
		type = DROPDOWN_TYPE.DEFAULT,
		queryString = "",
		bodyRequest,
		getValue = () => {},
	} = props;

	const dispatch: AppDispatch = useDispatch();
	const [dropdown, setDropdown] = useState<Option[]>(option);

	useEffect(() => {
		if (_.isEmpty(dropdown) && !_.isEmpty(type)) {
			dispatch(handleSession(type, setDropdown, queryString, bodyRequest));
		}
	}, [dropdown]);

	return (
		<>
			<BaseDropDown
				{...props}
				placeholder={placeholder}
				option={dropdown}
				getValue={(e) => getValue(handleGetValue(type, e))}
			/>
		</>
	);
}
