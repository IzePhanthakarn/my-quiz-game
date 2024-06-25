import React from "react";
import { Form, Input, Col, Row } from "antd";
import { Rule } from "antd/es/form";
import * as _ from "lodash";
import { FormItemCheckboxPosition } from "../FormItemCheckbox/constants/constants";

import dynamic from "next/dynamic";

// export default dynamic(() => Promise.resolve(NoSsr), { ssr: false })

interface Props {
	itemName: string;
	rules?: Rule[];
	value: string | number;
	maxLength?: number;
	disabled?: boolean;
	label?: string;
	isRequired?: boolean;
	onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
	labelPosition?: FormItemCheckboxPosition.LEFT | FormItemCheckboxPosition.TOP;
	labelLeftSpan?: number;
}

const FormItemInput2 = (props: Props) => {
	// export default function FormItemInput2(props: Props) {
	const {
		itemName,
		rules = [],
		value,
		maxLength = 9999,
		onChangeFunction,
		disabled = false,
		label = "",
		isRequired = false,
		labelPosition = FormItemCheckboxPosition.TOP,
		labelLeftSpan = 12,
	} = props;

	const handleLabelTopSpan = () => {
		if (labelPosition === FormItemCheckboxPosition.TOP) {
			return 24;
		} else if (labelPosition === FormItemCheckboxPosition.LEFT) {
			return labelLeftSpan;
		}
		return 24;
	};

	const handleInputSpan = () => {
		if (labelPosition === FormItemCheckboxPosition.TOP) {
			return 24;
		} else if (labelPosition === FormItemCheckboxPosition.LEFT) {
			return 24 - labelLeftSpan;
		}
		return 24;
	};

	return (
		<>
			<Row>
				{!_.isEmpty(label) && (
					<Col span={handleLabelTopSpan()}>
						<label className="">
							{label} {isRequired && <span className="text-red-600">*</span>}
						</label>
					</Col>
				)}

				<Col span={handleInputSpan()}>
					<Form.Item<{}>
						className={_.isEmpty(rules) ? "mb-0" : ""}
						name={itemName}
						rules={rules}
					>
						<Input
							className="h-[50px]"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								onChangeFunction(e)
							}
							value={value}
							maxLength={maxLength}
							disabled={disabled}
						/>
					</Form.Item>
				</Col>
			</Row>
		</>
	);
};

export default dynamic(() => Promise.resolve(FormItemInput2), { ssr: false });
