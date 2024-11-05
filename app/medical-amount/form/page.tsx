import React from "react";
import { NextPage } from "next";
import MedAmountForm from "@/modules/medical-amount/Form";

const MedicalAmountFormPage: NextPage<MedicalAmountFormPageProps> = ({
	params,
}) => {
	return <MedAmountForm params={params} />;
};

export default MedicalAmountFormPage;
