import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Login } from "../redux/model";
import Cookies from "js-cookie";
import { AppDispatch } from "@/redux/config/configStore";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import _ from "lodash";

export const validateLogin =
	(
		params: Login
		// , router: AppRouterInstance
	) =>
	async (dispatch: AppDispatch) => {
		const response = await dispatch(getToken(params));
		if (_.get(response, "error.message") === "Rejected") {
			return;
		}
		Cookies.set("Bearer", response.payload.access_token, {
			expires: 7,
			path: "/",
		});
		window.location.href = "/med/clinic";
	};

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
