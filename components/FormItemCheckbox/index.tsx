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
	labelPosition?: FormItemCheckboxPosition;
	rules?: Rule[];
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
	} = props;

	return (
		<>
			<Row>
				{labelPosition === FormItemCheckboxPosition.TOP && (
					<Col span={24}>
						<label className="">
							{label} {isRequired && <span className="text-red-600">*</span>}
						</label>
					</Col>
				)}
				<Col span={24}>
					<Form.Item
						className={_.isEmpty(rules) ? "mb-0" : ""}
						rules={rules}
						name={itemName}
					>
						<Checkbox
							checked={checked}
							onClick={() => {
								onClickFunction();
							}}
							disabled={disabled}
						/>
						{labelPosition === FormItemCheckboxPosition.RIGHT && (
							<label className="ml-2">
								{label} {isRequired && <span className="text-red-600">*</span>}
							</label>
						)}
					</Form.Item>
				</Col>
			</Row>
		</>
	);
}
