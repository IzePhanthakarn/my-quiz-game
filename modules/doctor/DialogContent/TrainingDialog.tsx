import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { TrainingList } from "../redux/form/model";
import ArrowRightOutlined from "wcf-component-lib/node_modules/@ant-design/icons/ArrowRightOutlined";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import { handleTrainingRows } from "./service";
import { SliceModel } from "@/redux/slices/model";
import dayjs, { Dayjs } from "wcf-component-lib/node_modules/dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import BaseItemDatePicker from "wcf-component-lib/src/components/BaseItemDatePicker";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { rules } from "./field-validation/FormValidation";
import Form from "wcf-component-lib/node_modules/antd/es/form";
interface Props {
	trainingGrid: TrainingList[];
	editId?: number;
}

export interface TraningState {
	trainingNo: string;
	trainingDate: Dayjs;
	uuid: string | null;
}

const defaultTraining: TraningState = {
	trainingNo: "",
	trainingDate: dayjs(),
	uuid: null,
};

export default function TraningDialog(props: Props) {
	const { trainingGrid, editId } = props;
	const dispatch: AppDispatch = useDispatch();
	const [form] = Form.useForm<TraningState>();

	const { isOpen } = useSelector(
		(state: SliceModel) => ({
			isOpen: state.dialog.isOpen,
		}),
		shallowEqual
	);

	const onFinish: FormProps<TraningState>["onFinish"] = () => {
		dispatch(
			handleTrainingRows({
				training,
				trainingGrid,
				editId,
			})
		);
	};

	const [training, setTraining] = React.useState<TraningState>(defaultTraining);

	useEffect(() => {
		setTraining(defaultTraining);
		if (editId) {
			const data = _.find(trainingGrid, ["id", editId]);
			if (!_.isEmpty(data)) {
				setTraining({
					trainingNo: data.trainingNo,
					trainingDate: dayjs(data.trainingDate),
					uuid: data.uuid ?? null,
				});
			}
		}
	}, [trainingGrid, isOpen, editId]);

	return (
		<div className="flex space-y-2 flex-col w-full">
			<p className="text-2xl">บันทึกข้อมูลการอบรม</p>
			<BaseForm initialValues={training} onFinish={onFinish} extraForm={form}>
				<div className="w-full space-y-2">
					<BaseItemInput
						label="รุ่นที่อบรม"
						rules={rules.trainingNo}
						itemName={"trainingNo"}
						labelPosition={BaseFormItemPosition.TOP}
						onChangeFunction={(e) =>
							setTraining({ ...training, trainingNo: e.target.value })
						}
					/>
					<BaseItemDatePicker
						itemName="trainingDate"
						label="วันที่อบรม"
						rules={rules.trainingDate}
						onChangeDateFunction={(e) => {
							setTraining({
								...training,
								trainingDate: e,
							});
						}}
					/>
				</div>
			</BaseForm>
			<BaseButton
				className="mt-2"
				icon={<ArrowRightOutlined />}
				iconPosition="end"
				onClick={() => {
					form.submit();
				}}
				label="บันทึก"
			/>
		</div>
	);
}
