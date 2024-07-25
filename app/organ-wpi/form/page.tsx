import React from "react";
import { NextPage } from "next";
import Form from "@/modules/organ-system-wpi/Form";

const OrganSystemWpiFormPage: NextPage<OrganSystemWpiFormPageProps> = ({
	params,
}) => {
	return <Form params={params} />;
};

export default OrganSystemWpiFormPage;
