import React from "react";
import { NextPage } from "next";
import Form from "@/modules/hospital/Form";

const HospitalFormPage: NextPage<HospitalFormPageProps> = ({ params }) => {
	return <Form params={params} />;
};

export default HospitalFormPage;
