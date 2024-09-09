import Modal from "wcf-component-lib/node_modules/antd/es/modal";
import { handleCloseDialog } from "./service";
import { Button } from "wcf-component-lib/node_modules/antd";
import CheckCircleOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/CheckCircleOutlined";
import ExclamationCircleOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import "./style.scss";
import { BaseDialogType } from "wcf-component-lib/src/constants/base-dialog-type";
export interface BaseDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	content: React.ReactNode;
	onConfirm?: () => void;
	onCancel?: () => void;
	baseDialogType?: BaseDialogType;
	headerText?: React.ReactNode;
	uniqueContent?: React.ReactNode;
}

const BaseDialogTest = (props: BaseDialogProps) => {
	const {
		isOpen,
		content,
		onConfirm,
		onCancel,
		setIsOpen,
		baseDialogType,
		headerText,
		uniqueContent,
	} = props;

	return (
		<Modal
			open={isOpen}
			centered
			onCancel={() => handleCloseDialog({ onCancel, setIsOpen })}
			maskClosable={false}
			footer={null}
		>
			{(uniqueContent as React.ReactNode) ?? (
				<div style={{ textAlign: "center" }}>
					{baseDialogType === BaseDialogType.SUCCESS && (
						<CheckCircleOutlined
							style={{ fontSize: "50px", color: "#08c", marginBottom: "12px" }}
						/>
					)}
					{baseDialogType === BaseDialogType.DANGER && (
						<ExclamationCircleOutlined
							style={{
								fontSize: "50px",
								color: "#C91432",
								marginBottom: "12px",
							}}
						/>
					)}

					<h1
						style={{
							fontSize: "24px",
							fontWeight: "700",
							lineHeight: "1",
							marginBottom: "20px",
						}}
					>
						{headerText}
					</h1>
					<h3
						style={{
							fontSize: "16px",
							fontWeight: "400",
							marginBottom: "23px",
						}}
					>
						{content}
					</h3>
					<Button
						danger={baseDialogType === BaseDialogType.DANGER ? true : false}
						type="primary"
						size="large"
						role="button"
						name="ตกลง"
						style={{
							fontSize: "17px",
							fontWeight: "600",
							width: "75px",
							height: "40px",
						}}
						onClick={() => handleCloseDialog({ onConfirm, setIsOpen })}
					>
						ตกลง
					</Button>
				</div>
			)}
		</Modal>
	);
};

export default BaseDialogTest;
