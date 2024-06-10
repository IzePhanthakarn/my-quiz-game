import React from "react";
import { NextPage } from "next";
import ClinicFormEdit from "../../../../modules/clinic/clinicFormEdit";

const ClinicFormPage: NextPage<ClinicFormPageProps> = ({ params }) => {
	return <ClinicFormEdit params={params} />;
};

export default ClinicFormPage;
