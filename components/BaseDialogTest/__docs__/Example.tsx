import React, { useState } from "react";
import Button from "antd/es/button";
import BaseDialog from "../index";

interface Props {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	content: React.ReactNode;
	onCancel?: () => void;
}

const Example = (props: Props) => {
	const { isOpen, content, onCancel } = props;
	const [isOpenState, setIsOpenState] = useState(isOpen);
	return (
		<div className="w-full flex justify-center">
			<Button onClick={() => setIsOpenState(!isOpenState)}>Test</Button>
			<BaseDialog
				isOpen={isOpenState}
				setIsOpen={setIsOpenState}
				onCancel={onCancel}
				content={content}
			/>
		</div>
	);
};

export default Example;
