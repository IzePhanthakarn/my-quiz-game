import _ from "lodash";
import Row from "wcf-component-lib/node_modules/antd/es/row";
import Col from "wcf-component-lib/node_modules/antd/es/col";
import { BaseFormProviderProps } from "./model";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { BaseFormItemPosition } from "wcf-component-lib/src/constants/form-item-position";
import {
	handleLabelTopSpan,
	handleInputSpan,
} from "wcf-component-lib/src/utils";

export default function BaseFormItemsProvider(props: BaseFormProviderProps) {
	const {
		itemName = "",
		rules = [],
		label = "",
		labelPosition = BaseFormItemPosition.TOP,
		labelLeftSpan = 12,
		children,
		notForm = false,
	} = props;

	const isRequired = _.some(rules, { required: true });

	return (
		<Row>
			<Col
				span={handleLabelTopSpan(labelPosition, labelLeftSpan)}
				className={`${!_.isEmpty(label) && "mb-2"}`}
			>
				{!_.isEmpty(label) && (
					<label className="text-sm">
						{isRequired && <span className="text-red-600">* </span>}
						{label}
					</label>
				)}
			</Col>
			<Col span={handleInputSpan(labelPosition, labelLeftSpan)}>
				{notForm ? (
					<div className={_.isEmpty(rules) ? "mb-0" : ""}>{<>children</>}</div>
				) : (
					<Form.Item
						className={_.isEmpty(rules) ? "mb-0" : ""}
						name={itemName}
						rules={rules}
					>
						{children}
					</Form.Item>
				)}
			</Col>
		</Row>
	);
}
