import PostalCodeDialog from "@/modules/doctor/DialogContent/PostCodeDialog";
import { handlePostalRows } from "@/modules/doctor/DialogContent/service";
import { DoctorPostalList } from "@/modules/doctor/redux/form/model";
import { AppDispatch } from "@/redux/config/configStore";
import { setDialog } from "@/redux/slices/dialog";
import { useMemo } from "react";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";

interface PostalProps {
	doctorPostalGrid: DoctorPostalList[];
	doctorCode: string;
	dispatch: AppDispatch;
}

export const GetColumnPostal = (props: PostalProps) => {
	const { doctorPostalGrid, dispatch } = props;
	const columns = useMemo(
		() => [
			{
				title: "ลำดับ",
				dataIndex: "id",
				key: "id",
			},
			{
				title: "รหัสไปรษณีย์",
				dataIndex: "postalId",
				key: "postalId",
			},
			{
				title: "ชื่อไปรษณีย์",
				dataIndex: "postalId",
				key: "postalId",
				render: (_: any, { postalId }: any) => {
					return <p>{findLabelAddress(postalId, ADDRESS.POSTAL_NAME_BY_ID)}</p>;
				},
			},
			{
				title: "คำสั่ง",
				dataIndex: "uuid",
				key: "uuid",
				render: (_: any, { id }: any) => {
					return (
						<CustomCellButton
							editFunction={() => {
								dispatch(
									setDialog({
										isOpen: true,
										uniqueContent: <PostalCodeDialog {...props} editId={id} />,
									})
								);
							}}
							deleteFunction={() => {
								dispatch(
									handlePostalRows({
										doctorPostalGrid,
										editId: id,
										isDelete: true,
									})
								);
							}}
							mode={BUTTON_MODE.EDIT_DELETE_ICON}
						/>
					);
				},
			},
		],
		[doctorPostalGrid]
	);

	return columns;
};
