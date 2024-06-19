import React from "react";
import { Form, Input, Col, Row } from "antd";
import { Rule } from "antd/es/form";
import * as _ from "lodash";

interface Props {
	itemName: string;
	rules?: Rule[];
	value: string | number;
	maxLength?: number;
	disabled?: boolean;
	label?: string;
	isRequired?: boolean;
	onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormItemInput(props: Props) {
	const {
		itemName,
		rules = [],
		value,
		maxLength = 9999,
		onChangeFunction,
		disabled = false,
		label = "",
		isRequired = false,
	} = props;

	return (
		<>
			<Row>
				{_.isEmpty(label) && (
					<Col span={24}>
						<label className="">
							{label} {isRequired && <span className="text-red-600">*</span>}
						</label>
					</Col>
				)}

				<Col span={24}>
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
}
