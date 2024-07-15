"use client";

import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type Props = {
	children: ReactNode;
};
const LoginWrapper: React.FC<Props> = (props) => {
	const router = useRouter();

	return <>{props.children}</>;
};

export default LoginWrapper;
