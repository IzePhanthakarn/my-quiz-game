import React from "react";
import { Form, Col, Row, Switch } from "antd";
import * as _ from "lodash";

interface Props {
	itemName: string;
	checked?: boolean;
	isRequired?: boolean;
	disabled?: boolean;
	label?: string;
	onChangeFunction: (e: boolean) => void;
}

export default function FormItemSwitch(props: Props) {
	const {
		itemName,
		onChangeFunction,
		disabled = false,
		label = "",
		checked = false,
		isRequired = false,
	} = props;

	return (
		<>
			<Row>
				<Col span={24}>
					<label className="">
						{label} {isRequired && <span className="text-red-600">*</span>}
					</label>
				</Col>

				<Col span={24}>
					<Form.Item name={itemName}>
						<Switch
							checked={checked}
							onChange={(e: boolean) => {
								onChangeFunction(e);
							}}
							disabled={disabled}
						/>
					</Form.Item>
				</Col>
			</Row>
		</>
	);
}
