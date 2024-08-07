import React from "react";
import { NextPage } from "next";
import DoctorForm from "@/modules/doctor/Form";

const DoctorFormPage: NextPage<UuidFormPageProps> = ({ params }) => {
	return <DoctorForm params={params} />;
};

export default DoctorFormPage;
