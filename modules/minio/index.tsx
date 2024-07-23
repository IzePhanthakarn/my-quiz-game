"use client";

import React from "react";
import { useState } from "react";
import { handleDownloadMinIO, handleUploadMinIO } from "./service";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";

export default function Minio() {
	const [file, setFile] = useState<File | null>(null);
	const dispatch: AppDispatch = useDispatch();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};
	return (
		<div>
			<input type="file" onChange={handleFileChange} />
			<br />
			<br />
			{/* <button onClick={handleUpload}>Upload</button> */}
			<button
				onClick={() => {
					dispatch(handleUploadMinIO(file));
				}}
			>
				Upload
			</button>
			<br />
			<br />
			<button
				onClick={() => {
					// dispatch(handleDownloadMinIO("2024-1-12_MOM คณะกรรมการV001.docx"));
					dispatch(handleDownloadMinIO("20220502_174645.jpg"));
				}}
			>
				Download
			</button>
		</div>
	);
}
