"use client";

import { getAccessToken } from "./service";
import Input from "wcf-component-lib/node_modules/antd/es/input";
import Button from "wcf-component-lib/node_modules/antd/es/button";
import { setPassword, setUserName } from "./redux";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Login {
	username: string;
	password: string;
	grant_type: string;
}

export default function Login() {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { login } = useSelector(
		(state: SliceModel) => ({
			login: state.login,
		}),
		shallowEqual
	);

	return (
		<div className="w-full flex items-center justify-center">
			<div className="w-1/4 px-4 py-4 border-2 border-black flex flex-col items-center justify-center space-y-4">
				<p className="text-black">เข้าสู่ระบบ</p>
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
				<Button
					type="primary"
					onClick={async () => {
						setLoading(true);
						await dispatch(getAccessToken(login));
						setLoading(false);
					}}
					loading={loading}
					iconPosition={"end"}
				>
					เข้าสู่ระบบ
				</Button>
				<Button
					type="primary"
					onClick={() => {
						router.push("/report/list");
					}}
					loading={loading}
					iconPosition={"end"}
				>
					ไปหน้ารวมรายงาน
				</Button>
			</div>
		</div>
	);
}
