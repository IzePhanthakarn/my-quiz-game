import React from "react";
import { NextPage } from "next";
import ClinicForm from "../../../modules/clinic/clinicForm";

const ClinicFormPage: NextPage<ClinicFormPageProps> = ({ params }) => {
	return <ClinicForm />;
};

export default ClinicFormPage;
