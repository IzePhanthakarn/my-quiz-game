import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { Cube } from "wcf-component-lib/node_modules/iconoir-react";
import { TrainingList } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import { handleTrainingRows } from "./service";
interface Props {
	trainingGrid: TrainingList[];
	doctorCode: string;
	editId?: number;
}

export interface TraningState {
	trainingNo: string;
	trainingDate: string;
}

const defaultTraining: TraningState = {
	trainingNo: "",
	trainingDate: "",
};

export default function TraningDialog(props: Props) {
	const { trainingGrid, doctorCode, editId } = props;
	const dispatch: AppDispatch = useDispatch();

	const [training, setTraining] = React.useState<TraningState>(defaultTraining);

	useEffect(() => {
		if (editId) {
			const data = _.find(trainingGrid, ["id", editId]);
			if (!_.isEmpty(data)) {
				setTraining({
					trainingNo: data.trainingNo,
					trainingDate: data.trainingDate,
				});
			}
		} else {
			setTraining(defaultTraining);
		}
	}, [trainingGrid, editId]);

	useEffect(() => {
		setTraining(defaultTraining);
	}, []);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<Cube />
			<p className="text-2xl">บันทึกข้อมูลการอบรม</p>
			<div className="w-full space-y-2">
				<BaseItemInput
					notForm
					label="รุ่นที่อบรม"
					labelPosition={BaseFormItemPosition.TOP}
					value={training.trainingNo}
					onChangeFunction={(e) =>
						setTraining({ ...training, trainingNo: e.target.value })
					}
				/>
				<BaseDatePicker
					itemName="contractStartDate"
					label="วันที่อบรม"
					value={training.trainingDate}
					onChangeDateFunction={(e) => {
						setTraining({ ...training, trainingDate: e });
					}}
				/>
			</div>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				disabled={_.some(_.values(training), (value) => value === "")}
				onClick={() => {
					dispatch(
						handleTrainingRows({
							training,
							doctorCode,
							trainingGrid,
							editId,
						})
					);
				}}
				label="บันทึก"
			/>
		</div>
	);
}
