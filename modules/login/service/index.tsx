import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Login } from "../redux/model";

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
			if (response.data.access_token) {
				localStorage.setItem("access_token", await response.data.access_token);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
