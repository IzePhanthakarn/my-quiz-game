export const handleCloseDialog = (params: {
	setIsOpen: (value: boolean) => void;
	onConfirm?: () => void;
	onCancel?: () => void;
}) => {
	const { setIsOpen, onConfirm = () => {}, onCancel = () => {} } = params;
	onConfirm();
	onCancel();
	setIsOpen(false);
};
