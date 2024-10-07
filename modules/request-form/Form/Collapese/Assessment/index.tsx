import _ from "lodash";
import React from "react";
import Editing from "./Editing";
import Creating from "./Creating";
export default function Assessment(props: { uuid: boolean }) {
	const { uuid } = props;
	return <div className="p-2">{uuid ? <Creating /> : <Editing />}</div>;
}
