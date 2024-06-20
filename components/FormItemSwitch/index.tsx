import React from "react";
import { Form, Col, Row, Switch } from "antd";
import * as _ from "lodash";
import { FormItemCheckboxPosition } from "../FormItemCheckbox/constants/constants";

interface Props {
	itemName: string;
	checked?: boolean;
	isRequired?: boolean;
	disabled?: boolean;
	label?: string;
	onChangeFunction: (e: boolean) => void;
	labelPosition?: FormItemCheckboxPosition;
}

export default function FormItemSwitch(props: Props) {
	const {
		itemName,
		onChangeFunction,
		disabled = false,
		label = "",
		checked = false,
		isRequired = false,
		labelPosition = FormItemCheckboxPosition.TOP,
	} = props;

	return (
		<>
			<Row>
				{labelPosition === FormItemCheckboxPosition.TOP &&
					!_.isEmpty(label) && (
						<Col span={24}>
							<label className="">
								{label} {isRequired && <span className="text-red-600">*</span>}
							</label>
						</Col>
					)}
				<Col span={24}>
					<Form.Item name={itemName}>
						{labelPosition === FormItemCheckboxPosition.LEFT &&
							!_.isEmpty(label) && (
								<label className="mr-2">
									{label}
									{isRequired && <span className="text-red-600">*</span>}
								</label>
							)}
						<Switch
							checked={checked}
							onChange={(e: boolean) => {
								onChangeFunction(e);
							}}
							disabled={disabled}
						/>
						{labelPosition === FormItemCheckboxPosition.RIGHT &&
							!_.isEmpty(label) && (
								<label className="ml-2">
									{label}
									{isRequired && <span className="text-red-600">*</span>}
								</label>
							)}
					</Form.Item>
				</Col>
			</Row>
		</>
	);
}
