import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import {
	Address,
	Diploma,
	DoctorHospital,
	Option,
	OptionLtPropertiesType,
} from "wcf-component-lib/src/components/BaseDropDown/model";
import { findAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { LtPropertiesList } from "wcf-component-lib/src/components/BaseDropDown/service/api";
import { API_METHOD, DROPDOWN_TYPE, DROPDOWN } from "../model";

interface DropDownParams {
	apiPath: string;
	queryString?: string;
	bodyRequest?: any;
	method: API_METHOD;
}

export const handleSession =
	(
		type: DROPDOWN_TYPE,
		setDropdown?: (value: Option[]) => void,
		queryString?: string,
		bodyRequest?: any
	) =>
	async (dispatch: AppDispatch) => {
		const { apiPath, sessionName, method, baseBody } = DROPDOWN[type];

		const getSession = JSON.parse(sessionStorage.getItem(sessionName) ?? "[]");

		if (!_.isEmpty(getSession)) {
			const data = await handleOption(type, getSession);
			if (setDropdown) setDropdown(data);
			return;
		}

		if (!_.isEmpty(baseBody)) bodyRequest = baseBody;
		const response = await dispatch(
			fetchDropDownList({ apiPath, method, queryString, bodyRequest })
		);

		if (!_.isEmpty(response)) {
			sessionStorage.setItem(sessionName, JSON.stringify(response.payload));
			if (setDropdown) {
				const data = handleOption(type, response.payload);
				setDropdown(data);
			}
		}
	};

export const handleGetValue = (type: DROPDOWN_TYPE, value: any) => {
	switch (type) {
		case DROPDOWN_TYPE.ADDRESS:
			const data = findAddress(value);
			return data;
		default:
			return value;
	}
};

const handleOption = (type: DROPDOWN_TYPE, result: any) => {
	switch (type) {
		case DROPDOWN_TYPE.DIPLOMA:
			const diploma: Option[] = result.map((e: Diploma) => ({
				label: `${e.diplomaType.trim()}-${e.diplomaName}`,
				value: e.diplomaType,
			}));
			return diploma;
		case DROPDOWN_TYPE.HOSPITAL:
			const hospital: Option[] = result.map((e: DoctorHospital) => ({
				label: `${e.hospitalWcfCode}-${e.hospitalName}`,
				value: `${e.hospitalWcfCode}-${e.hospitalName}`,
			}));
			return hospital;
		case DROPDOWN_TYPE.ADDRESS:
			const option_address = result.map((e: Address) => ({
				value: `${e.tambolCode}/${e.postalCode}`,
				label:
					e.tambolName +
					" > " +
					e.amphurName +
					" > " +
					e.provinceName +
					" > " +
					e.postalCode,
			}));
			return option_address;
		case DROPDOWN_TYPE.JOB_TYPE:
			const jobType: OptionLtPropertiesType[] = result.map(
				(e: LtPropertiesList) => ({
					value: e.propertyCode,
					label: e.propertyText,
				})
			);
			return jobType;
		case DROPDOWN_TYPE.HOSPITAL_TYPE:
			const hospitalType: OptionLtPropertiesType[] = result.content.map(
				(e: LtPropertiesList) => ({
					value: e.propertyCode,
					label: e.propertyText,
				})
			);
			return hospitalType;
		default:
			return [];
	}
};

export const fetchDropDownList = createAsyncThunk(
	"Medical/fetchDropDownList",
	async (params: DropDownParams, thunkAPI) => {
		const { apiPath, queryString = "", bodyRequest, method } = params;

		try {
			let response;
			if (method === "GET") {
				const newApiPath = `${apiPath}${queryString}`;
				response = await axios.get(newApiPath);
			} else {
				response = await axios.post(apiPath, bodyRequest);
			}
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue("");
		}
	}
);
