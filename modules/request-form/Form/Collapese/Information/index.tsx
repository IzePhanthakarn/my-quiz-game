import React from "react";
import Address from "./Address";
import MoreDetails from "./MoreDetails";
import Doctor from "./Doctor";
import Victim from "./Victim";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
export default function Information(props: { uuid: boolean }) {
	const { uuid } = props;
	return (
		<BaseColumn className="space-y-4">
			<Victim uuid={uuid} />
			<Address uuid={uuid} />
			<MoreDetails uuid={uuid} />
			<Doctor uuid={uuid} />
		</BaseColumn>
	);
}
