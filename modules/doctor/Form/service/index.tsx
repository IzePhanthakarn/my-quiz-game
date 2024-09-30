import { AppDispatch } from "@/redux/config/configStore";
import { setDialog } from "@/redux/slices/dialog";
import { setCompareParams, setDoctorCompareList } from "../../redux";
import HistoryDialog from "../History/HistoryDialog";
import { DoctorForm } from "../../redux/form/model";
import { modelDialog } from "@/redux/slices/dialog/model";

export const handleOpenHistory =
	(doctorForm: DoctorForm) => async (dispatch: AppDispatch) => {
		dispatch(
			setCompareParams({
				olderVersion: doctorForm.editTimes[doctorForm.editTimes.length - 2],
				newerVersion: doctorForm.editTimes[doctorForm.editTimes.length - 1],
				doctorCode: doctorForm.doctorData.doctorCode,
			})
		);
		dispatch(setDoctorCompareList({ doctor: [], doctorAddress: [] }));
		dispatch(
			setDialog({
				...modelDialog,
				isOpen: true,
				isOverFlow: true,
				uniqueContent: <HistoryDialog />,
			})
		);
	};
