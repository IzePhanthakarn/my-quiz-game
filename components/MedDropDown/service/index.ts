import { AppDispatch } from "@/redux/config/configStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import {
	Address,
	Diploma,
	DoctorHospital,
	Option,
} from "wcf-component-lib/src/components/BaseDropDown/model";
import { findAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { LtPropertiesList } from "wcf-component-lib/src/components/BaseDropDown/service/api";
import { API_METHOD, SESSION_NAME, DROPDOWN } from "../model";
import { Bank, BankBranch, CourseCategory, SsoBranch, Title } from "./model";
import { handleOption } from "./handleOption";
import {
	Hospital,
	HospitalForm,
} from "@/modules/hospital/redux/models/hospitalModel";

interface DropDownParams {
	apiPath: string;
	queryString?: string;
	bodyRequest?: any;
	method: API_METHOD;
}

export const handleSession =
	(
		type: SESSION_NAME,
		setDropdown?: (value: Option[]) => void,
		queryString?: string,
		bodyRequest?: any
	) =>
	async (dispatch: AppDispatch) => {
		const { apiPath, sessionName, method, baseBody } = DROPDOWN[type];

		const getSession = JSON.parse(sessionStorage.getItem(sessionName) ?? "[]");
		if (!_.isEmpty(getSession)) {
			const data = await handleOption(type, getSession);
			if (setDropdown) {
				setDropdown(data);
			}
			return;
		}

		if (!_.isEmpty(baseBody)) bodyRequest = baseBody;
		const response = await dispatch(
			fetchDropDownList({ apiPath, method, queryString, bodyRequest })
		);
		if (_.get(response, "error.message") === "Rejected") return;
		if (!_.isEmpty(response)) {
			sessionStorage.setItem(sessionName, JSON.stringify(response.payload));
			if (setDropdown) {
				const data = handleOption(type, response.payload);
				setDropdown(data);
			}
		}
	};

export const findNameDisplay = (type: SESSION_NAME, value: any) => {
	const session = JSON.parse(sessionStorage.getItem(type) ?? "[]");
	let nameDisplay = null;
	let sessionResult = null;
	switch (type) {
		case SESSION_NAME.DOCTOR_TYPE:
			sessionResult = session.find(
				(e: LtPropertiesList) => e.propertyCode === value
			);
			nameDisplay = sessionResult?.propertyText ?? null;
			break;
		case SESSION_NAME.TITLE:
			sessionResult = session.find((e: Title) => e.titleCode === value);
			nameDisplay = sessionResult?.titleName ?? null;
			break;
		case SESSION_NAME.BANK:
			sessionResult = session.find((e: Bank) => e.bankCode === value);
			nameDisplay = sessionResult?.bankName ?? null;
			break;
		case SESSION_NAME.BANK_BRANCH:
			sessionResult = session.find(
				(e: BankBranch) => e.bankBranchCode === value
			);
			nameDisplay = sessionResult?.bankBranchName ?? null;
			break;
		case SESSION_NAME.COURSE_CATEGORY:
			sessionResult = session.find(
				(e: CourseCategory) => e.courseCategory === value
			);
			nameDisplay = sessionResult?.categoryDescription ?? null;
			break;
		case SESSION_NAME.HOSPITAL:
			sessionResult = session.find(
				(e: HospitalForm) => e.hospitalWcfCode === value
			);
			nameDisplay = sessionResult?.hospitalName ?? null;
			break;
		default:
			return value;
	}
	return nameDisplay;
};

export const handleGetValue = (type: SESSION_NAME, value: any) => {
	switch (type) {
		case SESSION_NAME.ADDRESS:
		case SESSION_NAME.POSTAL_ID:
			const data = findAddress(value);
			return data;
		default:
			return value;
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
			return thunkAPI.rejectWithValue(err);
		}
	}
);
