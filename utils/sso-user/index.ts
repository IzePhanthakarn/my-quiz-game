import { AppDispatch } from "@/redux/config/configStore";
import { SsoUser } from "@/redux/slices/sso_user/model";
import { getUmsSsoUser } from "./api";
import _ from "lodash";
import { setSsoUser } from "@/redux/slices/sso_user";

export const getSsoUser =
	(login: string, userList: SsoUser[]) => async (dispatch: AppDispatch) => {
		try {
			const newUserList = _.cloneDeep(userList);

			getExistingSsoUser(login, newUserList);

			const response = await dispatch(getUmsSsoUser(login));
			if (!_.isEmpty(response.payload)) {
				newUserList.push(response.payload);
				dispatch(setSsoUser(newUserList));
				return response.payload;
			}

			return null;
		} catch (err) {
			return null;
		}
	};

export const getExistingSsoUser = (login: string, userList: SsoUser[]) => {
	try {
		const newUserList = _.cloneDeep(userList);

		const existingUser = _.find(newUserList, { login });
		if (existingUser) {
			return existingUser;
		}

		return null;
	} catch (err) {
		return null;
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
