import * as React from "react";
import "./style.css";
import Spin from "wcf-component-lib/node_modules/antd/lib/spin";

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
