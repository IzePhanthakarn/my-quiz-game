"use client";

import React, { useEffect } from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { initGetDoctorForm } from "../service";
import { useParams } from "next/navigation";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";
import { itemsTables } from "./Detail/model";

const DoctorFormTabs = () => {
	const { uuid } = useParams();
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (uuid) dispatch(initGetDoctorForm(`${uuid}`));
	}, [uuid]);

	return (
		<BaseColumn className="bg-white p-2 h-full">
			{itemsTables?.map((item, index: number) => (
				<BaseCollapse
					key={item.key}
					defaultActiveKey={index + 1}
					items={[item]}
				/>
			))}
		</BaseColumn>
	);
};
export default dynamic(() => Promise.resolve(DoctorFormTabs), { ssr: false });
