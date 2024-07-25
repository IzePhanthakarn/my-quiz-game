import React from "react";
import { NextPage } from "next";
import Form from "@/modules/medical-amount/Form";

const MedicalAmountFormPage: NextPage<MedicalAmountFormPageProps> = ({
	params,
}) => {
	return <Form params={params} />;
};

export default MedicalAmountFormPage;
