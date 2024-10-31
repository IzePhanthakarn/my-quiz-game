import axios from "axios";
import Cookies from "js-cookie";

const axiosReport = axios.create({});
axiosReport.defaults.baseURL = process.env.NEXT_PUBLIC_API_REPORT_URL;
axiosReport.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
	"accessToken"
)}`;

export default axiosReport;