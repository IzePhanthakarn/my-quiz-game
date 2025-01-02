import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTemplateDoctor = createAsyncThunk(
	"Medical/getTemplate",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(
				"https://api-dev-wcf.soilfish.co/mw/storage/test-med/zip/doctor_import_template.xlsx",
				{
					responseType: "blob", // Important to handle binary data
				}
			);
			return response.data; // Return the binary data only
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
