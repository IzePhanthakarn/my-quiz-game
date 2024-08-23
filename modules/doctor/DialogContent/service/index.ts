import { AppDispatch } from "@/redux/config/configStore";
import { DoctorDetailList } from "../../redux/form/model";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import { grid } from "@/modules/course-certificate/columns/grid";
import { setIsOpenDialog } from "@/redux/slices/dialog";
import { mapIdByIndex } from "@/utils";
import _ from "lodash";
import { setDoctorDetailList } from "../../redux";

export const addDoctorDetailRows =
	(params: {
		diplomaType: string;
		doctorCode: string;
		doctorDetail: DoctorDetailList[];
	}) =>
	async (dispatch: AppDispatch) => {
		const { diplomaType, doctorCode, doctorDetail } = params;
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

		const newGrid = _.cloneDeep(doctorDetail);
		newGrid.push(newDoctorDetail);
		dispatch(setDoctorDetailList(mapIdByIndex(newGrid)));
		dispatch(setIsOpenDialog(false));
	};
