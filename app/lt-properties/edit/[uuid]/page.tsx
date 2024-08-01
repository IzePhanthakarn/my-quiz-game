import React from "react";
import { NextPage } from "next";
import Form from "@/modules/lt-properties/Form";

const LtPropertiesFormPage: NextPage<LtPropertiesFormPageProps> = ({
	params,
}) => {
	return <Form params={params} />;
};

export default LtPropertiesFormPage;
