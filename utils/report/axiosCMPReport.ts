import axios from "axios";
import Cookies from "js-cookie";

const axiosCMPReport = axios.create({});
axiosCMPReport.defaults.baseURL = process.env.NEXT_PUBLIC_API_CMP_REPORT_URL;
axiosCMPReport.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
	"accessToken"
)}`;

export default axiosCMPReport;