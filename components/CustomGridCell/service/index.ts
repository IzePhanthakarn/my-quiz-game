import { STATUS } from "../model";

export const getStatusBgColor = (status: STATUS) => {
	if (status === STATUS.SUCCESS) return "bg-[#2E7D32]";
	else return "bg-[#ED8C08]";
};
