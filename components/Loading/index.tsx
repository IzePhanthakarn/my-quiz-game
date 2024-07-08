import * as React from "react";
import "./style.css";
// import CircularProgress from "@mui/material/CircularProgress";
// import Backdrop from "@mui/material/Backdrop";

import Spin from "antd/es/spin";

export default function Loading() {
	const contentStyle: React.CSSProperties = {
		padding: 50,
		background: "rgba(0, 0, 0, 0.05)",
		borderRadius: 4,
	};

	const content = <div style={contentStyle} />;
	return (
		<>
			<div className="spin-loading">
				<div className="spin-loading-child">
					<Spin tip="Loading" size="large">
						{content}
					</Spin>
				</div>
			</div>
		</>
	);
}
