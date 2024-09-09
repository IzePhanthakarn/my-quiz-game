import { Button } from "wcf-component-lib/node_modules/antd";
import {
	ButtonHTMLType,
	ButtonType,
} from "wcf-component-lib/node_modules/antd/es/button/buttonHelpers";

export interface Props {
	label: string;
	className?: string;
	type?: ButtonType | undefined;
	htmlType?: ButtonHTMLType | undefined;
	onClickFunction?: () => void;
	customStyle?: React.CSSProperties | undefined;
	icon?: JSX.Element | undefined;
	iconPosition?: "start" | "end" | undefined;
}

export default function BaseSubmitButtonTest(props: Props) {
	const {
		label,
		className = "",
		type = undefined,
		htmlType = undefined,
		onClickFunction = () => {},
		customStyle = {},
		icon = undefined,
		iconPosition = undefined,
	} = props;

	return (
		<>
			<Button
				type={type}
				onClick={() => onClickFunction()}
				htmlType={htmlType}
				className={`${className}`}
				style={customStyle}
				// icon={<ClockCircleOutlined />}
				icon={icon}
				iconPosition={iconPosition}
				// styles={{ icon: { marginTop: "205px" } }}
			>
				{label}
			</Button>
		</>
	);
}
