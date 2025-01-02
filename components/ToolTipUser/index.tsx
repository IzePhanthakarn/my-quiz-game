import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { getExistingSsoUser, getSsoUser } from "@/utils/sso-user";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import BaseTooltip, {
	BaseTooltipProps,
} from "wcf-component-lib/src/components/BaseToolTip";

interface Props extends BaseTooltipProps {
	displayName?: string;
}

export default function ToolTipUser(props: Props) {
	const { displayName, name, trigger = "hover", className, color } = props;

	const dispatch: AppDispatch = useDispatch();
	const { ssoUser } = useSelector(
		(state: SliceModel) => ({
			ssoUser: state.ssoUser.list,
		}),
		shallowEqual
	);
	return (
		<BaseTooltip
			name={displayName ?? name}
			color={color}
			contentType="user"
			className={className}
			trigger={trigger}
			onClick={() => {
				trigger === "click" && dispatch(getSsoUser(name, ssoUser));
			}}
			onHover={() => {
				trigger === "hover" && dispatch(getSsoUser(name, ssoUser));
			}}
			userItem={getExistingSsoUser(name, ssoUser)}
		/>
	);
}
