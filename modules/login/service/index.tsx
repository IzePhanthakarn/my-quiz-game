import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Login } from "../redux/model";
import { setCookie } from "./cookie";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";

export const getToken = createAsyncThunk(
	"User/getCourseList",
	async (params: Login, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.GET_ACCESS_TOKEN}`;
			const response = await axios.post(apiPath, null, {
				params: {
					grant_type: "password",
					username: params.username,
					password: params.password,
				},
				auth: {
					username: "app1",
					password: "password",
				},
			});
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getPage = createAsyncThunk(
	"Users/getPageAccess",
	async (username: string, thunkAPi) => {
		try {
			const apiPath = `https://api-dev-wcf.soilfish.co/ums/users/${username}/page-accesses`;
			const response = await axios.get(apiPath);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const getAccessToken =
	(params: Login) => async (dispatch: AppDispatch) => {
		const result = await dispatch(getToken(params));
		if (!result) return;
		if (result.payload.access_token) {
			setCookie("Bearer", await result.payload.access_token);
			await dispatch(getPageAccess(params.username));
		}
	};

export const getPageAccess =
	(username: string) => async (dispatch: AppDispatch) => {
		const result = await dispatch(getPage(username));
		if (!result) return;
		if (!_.isEmpty(result.payload)) {
			const pageAccess = JSON.stringify(await result.payload);
			localStorage.setItem("page_access", pageAccess);
			window.location.href = "/med/clinic";
		}
	};
