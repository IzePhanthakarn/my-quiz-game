import { AppDispatch } from "@/redux/config/configStore";
import { setDialog } from "@/redux/slices/dialog";
import { setcompareParams, setDoctorCompareList } from "../../redux";
import HistoryDialog from "../History/HistoryDialog";
import { DoctorForm } from "../../redux/form/model";

export const handleOpenHistory =
	(doctorForm: DoctorForm) => async (dispatch: AppDispatch) => {
		dispatch(
			setcompareParams({
				edit1: null,
				edit2: doctorForm.editTimes - 1,
				doctorCode: doctorForm.doctorData.doctorCode,
			})
		);
		dispatch(setDoctorCompareList({ doctor: [], doctorAddress: [] }));
		dispatch(
			setDialog({
				isOpen: true,
				uniqueContent: <HistoryDialog />,
			})
		);
	};
