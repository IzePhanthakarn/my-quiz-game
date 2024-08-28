import { AppDispatch } from "@/redux/config/configStore";
import { DoctorDetailList } from "../../redux/form/model";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { setIsOpenDialog } from "@/redux/slices/dialog";
import { mapIdByIndex } from "@/utils";
import _ from "lodash";
import { setDoctorDetailList } from "../../redux";

export const handleDoctorDetailRows =
	(params: {
		diplomaType?: string;
		doctorCode?: string;
		doctorDetailGrid: DoctorDetailList[];
		editId?: number;
		isDelete?: boolean;
	}) =>
	async (dispatch: AppDispatch) => {
		const {
			diplomaType = "",
			doctorCode = "",
			doctorDetailGrid,
			editId,
			isDelete,
		} = params;
		const newDoctorDetail: DoctorDetailList = {
			id: 0,
			doctorCode: doctorCode,
			diplomaType: diplomaType,
			uuid: "",
			isActive: IsActive.Y,
			createdDate: "",
			createdBy: "",
			updatedDate: "",
			updatedBy: "",
		};

		const newGrid = _.cloneDeep(doctorDetailGrid);
		console.log("newGrid", newGrid);
		if (!_.isUndefined(editId)) {
			const index = newGrid.findIndex((item) => item.id === editId);
			if (isDelete) newGrid.splice(index, 1);
			else newGrid[index] = { ...newDoctorDetail, id: editId };
		} else newGrid.push(newDoctorDetail);
		dispatch(setDoctorDetailList(mapIdByIndex(newGrid)));
		dispatch(setIsOpenDialog(false));
	};
