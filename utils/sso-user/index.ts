import { AppDispatch } from "@/redux/config/configStore";
import { SsoUser } from "@/redux/slices/sso_user/model";
import { getUmsSsoUser } from "./api";
import _ from "lodash";
import { setSsoUser } from "@/redux/slices/sso_user";

export const getSsoUser =
	(login: string, userList: SsoUser[]) => async (dispatch: AppDispatch) => {
		try {
			const newUserList = _.cloneDeep(userList);

			const haveExistingUser = getExistingSsoUser(login, newUserList);
			if (haveExistingUser) return;
			const response = getMock();
			if (!_.isEmpty(response)) {
				newUserList.push(response);
				dispatch(setSsoUser(newUserList));
				return response;
			}
			// const response = await dispatch(getUmsSsoUser(login));
			// if (!_.isEmpty(response.payload)) {
			// 	newUserList.push(response.payload);
			// 	dispatch(setSsoUser(newUserList));
			// 	return response.payload;
			// }

			return null;
		} catch (err) {
			return null;
		}
	};

const getMock = () => {
	return {
		userId: 1,
		login: "molpapha",
		firstName: "Molpapha",
		lastName: "Surinthong",
		email: "molpapha@depthfirst.co.th",
		ssoBranchCode: "1000",
		lastLoginDate: "2024-12-19T16:29:26.501+07:00",
		type: "OTHER",
		active: "Y",
		title: "นางสาว",
		// investigateCode: null,
		workingDeptDescription: "Information System",
		workingDeptNo: "0001",
		employeeType: "พนักงานบริษัท",
		ssoPersonPosition: "เจ้าหน้าที่วิเคราะห์ธุรกิจ",
		ssoPersonClass: "BA",
		titleEn: "Miss",
		firstNameEn: "Molpapha",
		lastNameEn: "Surinthong",
		createdDate: "2024-12-19T16:29:26.497+07:00",
		createdBy: "bunyasan.kh",
		lastUpdatedDate: "2024-12-19T16:29:26.497+07:00",
		lastUpdatedBy: "bunyasan.kh",
		hasSecurityCode: "N",
		investigateCode: "",
	};
};

export const getExistingSsoUser = (login: string, userList: SsoUser[]) => {
	try {
		const existingUser = _.find(userList, { login });
		if (existingUser) {
			return existingUser;
		}
		return undefined;
	} catch (err) {
		return undefined;
	}
};

export const getSsoUserList =
	(login: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await dispatch(getUmsSsoUser(login));
			if (!_.isEmpty(response.payload)) {
				return response.payload;
			}
			return null;
		} catch (err) {
			return null;
		}
	};
