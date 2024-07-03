import React from "react";
import { NextPage } from "next";
import Form from "../../../../modules/clinic/Form";

const ClinicFormPage: NextPage<ClinicFormPageProps> = ({ params }) => {
	return <Form params={params} />;
};

export default ClinicFormPage;
