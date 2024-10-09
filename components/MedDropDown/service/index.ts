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
import { CourseCategory, SsoBranch, Title } from "./model";

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
			if (setDropdown) setDropdown(data);
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

const handleOption = (type: SESSION_NAME, result: any) => {
	switch (type) {
		case SESSION_NAME.DIPLOMA:
			const diploma: Option[] = result.map((e: Diploma) => ({
				label: `${e.diplomaType.trim()}-${e.diplomaName}`,
				value: e.diplomaType,
			}));
			return diploma;
		case SESSION_NAME.SSO_BRANCH:
			const sso_branch: Option[] = result.map((e: SsoBranch) => ({
				label: `${e.ssoBranchCode} ${e.provinceName}`,
				value: e.ssoBranchCode,
			}));
			return sso_branch;
		case SESSION_NAME.SSO_BRANCH_PROVINCE:
			const sso_branch_province: Option[] = result.map((e: SsoBranch) => ({
				label: `${e.ssoBranchCode} ${e.provinceName}`,
				value: `${e.provinceCode}-${e.provinceName}`,
			}));
			return sso_branch_province;
		case SESSION_NAME.SSO_BRANCH_PROVINCE_CODENAME:
			const sso_branch_province_codename: Option[] = result.map(
				(e: SsoBranch) => ({
					label: `${e.ssoBranchCode} ${e.provinceName}`,
					value: `${e.ssoBranchCode}-${e.provinceName}`,
				})
			);
			return sso_branch_province_codename;
		case SESSION_NAME.COURSE_CATEGORY:
			const courseCategory: Option[] = result.map((e: CourseCategory) => ({
				label: e.categoryDescription,
				value: e.courseCategory,
			}));
			return courseCategory;
		case SESSION_NAME.HOSPITAL:
			const hospital: Option[] = result.map((e: DoctorHospital) => ({
				label: `${e.hospitalWcfCode}-${e.hospitalName}`,
				value: `${e.hospitalWcfCode}-${e.hospitalName}`,
			}));
			return hospital;
		case SESSION_NAME.ADDRESS:
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
		case SESSION_NAME.POSTAL_ID:
			const postalIdLabel = result.map((e: Address) => ({
				value: `${e.tambolCode}/${e.postalCode}`,
				label: e.postalId + "-" + e.postalName,
			}));
			return postalIdLabel;

		case SESSION_NAME.PROVINCE_NAME:
			const uniqueProvinces = _.uniqBy(result, "provinceCode"); // กรองซ้ำตาม provinceCode
			const provinceName = _.map(uniqueProvinces, (e: Address) => ({
				value: e.provinceCode,
				label: e.provinceName,
			}));
			return provinceName;

		case SESSION_NAME.HOSPITAL_TYPE:
		case SESSION_NAME.HOSPITAL_CATEGORY:
			const ltProperties: Option[] = result.content.map(
				(e: LtPropertiesList) => ({
					value: e.propertyCode,
					label: e.propertyText,
				})
			);
			return ltProperties;
		case SESSION_NAME.JOB_TYPE:
		case SESSION_NAME.SSO_PROJECT:
		case SESSION_NAME.DOCTOR_TYPE:
			const medLtProperties: Option[] = result.map((e: LtPropertiesList) => ({
				value: e.propertyCode,
				label: e.propertyText,
			}));
			return medLtProperties;
		case SESSION_NAME.TITLE:
			const title: Option[] = result.map((e: Title) => ({
				label: e.titleName,
				value: e.titleCode,
			}));
			return title;
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
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const findNameDisplay = (type: SESSION_NAME, value: any) => {
	switch (type) {
		case SESSION_NAME.DOCTOR_TYPE:
			const doctorType = JSON.parse(sessionStorage.getItem(type) ?? "[]");
			const doctorTypeResult = doctorType.find(
				(e: LtPropertiesList) => e.propertyCode === value
			);
			return doctorTypeResult?.propertyText ?? null;
		case SESSION_NAME.TITLE:
			const title = JSON.parse(sessionStorage.getItem(type) ?? "[]");
			const titleResult = title.find((e: Title) => e.titleCode === value);
			return titleResult?.titleName ?? null;
		default:
			return value;
	}
};
