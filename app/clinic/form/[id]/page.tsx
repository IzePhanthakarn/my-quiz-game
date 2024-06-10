import Clinic from "@/modules/clinic";
import React from "react";
import { NextPage } from "next";
import ClinicForm from "../../../../modules/clinic/clinicForm";

const ClinicFormPage: NextPage<ClinicFormPageProps> = ({ params }) => {
	return <ClinicForm params={params} />;
};

export default ClinicFormPage;
