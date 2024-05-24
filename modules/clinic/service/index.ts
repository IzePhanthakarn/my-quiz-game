import { AppDispatch } from "@/redux/config/configStore";
import { getClinicList } from "@/service/clinic";

export const getClinic = async (dispatch: AppDispatch) => {
  const response = await dispatch(getClinicList());
  return response;
};
