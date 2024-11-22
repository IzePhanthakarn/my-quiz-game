import React from "react";

export default function ErrorModal({
	errorList = [],
}: {
	errorList: string[];
}) {
	return (
		<div className="mt-2">
			{errorList.map((item, index) => (
				<p key={index}>{item}</p>
			))}
		</div>
	);
}
