import Form from "antd/es/form";
import _ from "lodash";
import { BaseFormItemPosition } from "../../constants/form-item-position";
import Row from "antd/es/row";
import Col from "antd/es/col";
import { handleInputSpan, handleLabelTopSpan } from "../../utils";
import { BaseFormProviderProps } from "./model";

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
