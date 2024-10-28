import { AppDispatch } from "@/redux/config/configStore";
import { setDialog } from "@/redux/slices/dialog";
import { setCompareParams, setDoctorCompareList } from "../../redux";
import HistoryDialog from "../History/HistoryDialog";
import { DoctorForm } from "../../redux/form/model";
import CompareAllDialog from "../History/CompareAllDialog";

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
				isOpen: true,
				isOverFlow: true,
				uniqueContent: <HistoryDialog />,
			})
		);
	};

export const handleOpenHistoryAll = () => async (dispatch: AppDispatch) => {
	dispatch(
		setDialog({
			isOpen: true,
			isOverFlow: true,
			uniqueContent: <CompareAllDialog />,
		})
	);
};
