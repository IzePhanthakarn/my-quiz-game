"use client";

import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type Props = {
	children: ReactNode;
};
const LoginWrapper: React.FC<Props> = (props) => {
	const router = useRouter();

	useEffect(() => {
		if (!_.isEmpty(localStorage.getItem("access_token"))) {
			// router.push("/med/clinic");
		} else {
			router.push("/login");
		}
	}, []);

	return <>{props.children}</>;
};

export default LoginWrapper;
