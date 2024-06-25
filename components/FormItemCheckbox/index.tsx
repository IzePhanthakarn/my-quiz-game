import React from "react";
import { Form, Col, Row, Checkbox } from "antd";
import * as _ from "lodash";
import { FormItemCheckboxPosition } from "./constants/constants";
import { Rule } from "antd/es/form";

interface Props {
	itemName: string;
	checked?: boolean;
	isRequired?: boolean;
	disabled?: boolean;
	label?: string;
	onClickFunction: () => void;
	labelPosition?:
		| FormItemCheckboxPosition.RIGHT
		| FormItemCheckboxPosition.LEFT;
	rules?: Rule[];
	labelLeftSpan?: number;
}

export default function FormItemCheckbox(props: Props) {
	const {
		itemName,
		onClickFunction,
		disabled = false,
		label = "",
		checked = false,
		isRequired = false,
		labelPosition = FormItemCheckboxPosition.RIGHT,
		rules = [],
		labelLeftSpan = 12,
	} = props;

	return (
		<>
			<Row>
				{/* {!_.isEmpty(label) && (
					<Col span={24}>
						<label className="">
							{label} {isRequired && <span className="text-red-600">*</span>}
						</label>
					</Col>
				)} */}
				<Col span={24}>
					<Form.Item
						className={_.isEmpty(rules) ? "mb-0" : ""}
						rules={rules}
						name={itemName}
					>
						{labelPosition === FormItemCheckboxPosition.LEFT &&
							!_.isEmpty(label) && (
								<label className="mr-2">
									{label}
									{isRequired && <span className="text-red-600">*</span>}
								</label>
							)}

						<Checkbox
							checked={checked}
							onClick={() => {
								onClickFunction();
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
