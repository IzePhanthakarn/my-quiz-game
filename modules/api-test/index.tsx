"use client";

import React from "react";
import BaseThaiAddress from "wcf-component-lib/src/components/BaseThaiAddress";

export default function Api() {
	const modelAddress: Address = {
		id: "",
		zipcode: "",
		tambons_id: "",
		tambons_name: "",
		amphure_id: "",
		amphure_name: "",
		province_id: "",
		province_name: "",
	};

	interface Address {
		id: string;
		zipcode: string;
		tambons_id: string;
		tambons_name: string;
		amphure_id: string;
		amphure_name: string;
		province_id: string;
		province_name: string;
		[key: string]: string;
	}
	const [value, setValue] = React.useState<Address>(modelAddress);
	return (
		<>
			<BaseThaiAddress
				label="ตำบล"
				address={value}
				setAddress={setValue}
				type="tambons_name"
				className="w-[400px]"
				itemName={""}
			/>
			<BaseThaiAddress
				label="อำเภอ"
				address={value}
				setAddress={setValue}
				type="amphure_name"
				className="w-[400px]"
				itemName={""}
			/>
			<BaseThaiAddress
				label="จังหวัด"
				address={value}
				setAddress={setValue}
				type="province_name"
				className="w-[400px]"
				itemName={""}
			/>
			<BaseThaiAddress
				label="รหัสไปรษณีย์"
				address={value}
				setAddress={setValue}
				type="zipcode"
				className="w-[400px]"
				itemName={""}
			/>
		</>
	);
}
