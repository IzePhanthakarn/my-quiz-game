"use client";

import React from "react";
import { useState } from "react";
import {
	handleDownloadMinIO,
	handleUploadMinIO,
	handleUploadMultipleMinIO,
} from "./service";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { setFile, setMultipleFiles } from "./redux";

export default function Minio() {
	// const [file, setFile] = useState<File | null>(null);
	// const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const dispatch: AppDispatch = useDispatch();
	const { file, files } = useSelector(
		(state: SliceModel) => ({
			// isOpen: state.drawer.isOpen,
			// isLoading: state.loading.isLoading,
			file: state.minIO.file,
			files: state.minIO.files,
		}),
		shallowEqual
	);
	const handleFileChangeMultiple = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			// setSelectedFiles(Array.from(e.target.files));
			dispatch(setMultipleFiles(Array.from(e.target.files)));
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			// setFile(e.target.files[0]);
			dispatch(setFile(e.target.files[0]));
		}
	};

	return (
		<div>
			<input type="file" multiple onChange={handleFileChangeMultiple} />
			<br />
			<br />
			{/* <button onClick={handleUpload}>Upload</button> */}
			<button
				onClick={() => {
					dispatch(handleUploadMultipleMinIO(files));
				}}
			>
				Upload Multiple file
			</button>
			<br />
			<br />
			<input type="file" onChange={handleFileChange} />
			<br />
			<br />
			{/* <button onClick={handleUpload}>Upload</button> */}
			<button
				onClick={() => {
					dispatch(handleUploadMinIO(file));
				}}
			>
				Upload 1 file
			</button>
			<br />
			<br />
			<br />
			<br />
			<br />
			<button
				onClick={() => {
					// dispatch(handleDownloadMinIO("2024-1-12_MOM คณะกรรมการV001.docx"));
					dispatch(handleDownloadMinIO("1_BQZAbczBfLYtPp-6HmN0ZQ.jpg"));
				}}
			>
				Download
			</button>
		</div>
	);
}
