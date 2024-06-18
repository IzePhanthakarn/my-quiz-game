"use client";

import React from "react";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setIsOpenDialog } from "./redux";
import Modal from "antd/es/modal";

interface Props {
	isOpen: boolean;
	content: React.ReactNode;
}

export default function BaseDialog(props: Props) {
	const dispatch: AppDispatch = useDispatch();
	const { isOpen, content } = props;
	return (
		<Modal
			open={isOpen}
			centered
			onClose={() => dispatch(setIsOpenDialog(false))}
			onCancel={() => dispatch(setIsOpenDialog(false))}
			maskClosable={true}
		>
			{content}
		</Modal>
	);
}
