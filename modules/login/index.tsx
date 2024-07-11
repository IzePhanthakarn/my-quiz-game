"use client";

import React, { useEffect } from "react";
import { getToken } from "./service";
import { AppDispatch } from "@/redux/config/configStore";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { SliceModel } from "@/redux/slices/model";
import { setPassword, setUserName } from "./redux";
import { useRouter } from "next/navigation";
export default function Login() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const { login } = useSelector(
		(state: SliceModel) => ({
			login: state.login,
		}),
		shallowEqual
	);

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="w-1/4 px-4 py-4 border-2 border-black flex flex-col items-center justify-center space-y-4">
				<p>เข้าสู่ระบบ</p>
				checkBox
				<Input
					value={login.username}
					className="border-2 border-black"
					onChange={(e) => {
						dispatch(setUserName({ ...login, username: e.target.value }));
					}}
				/>
				<Input
					value={login.password}
					className="border-2 border-black"
					onChange={(e) => {
						dispatch(setPassword({ ...login, password: e.target.value }));
					}}
				/>
				<BaseButton
					label="เข้าสู่ระบบ"
					onClick={async () => {
						const token = await dispatch(getToken(login));
						if (token) router.push("/med/clinic");
					}}
				/>
			</div>
		</div>
	);
}
