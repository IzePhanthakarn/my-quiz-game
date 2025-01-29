import React from "react";
import { NextPage } from "next";
import HospitalAssessmentForm from "@/modules/hospital/Form/HospitalAssessment/Form";

const HospitalAssessmentFormPage: NextPage<HospitalAssessmentPageProps> = ({
	params,
}) => {
	return <HospitalAssessmentForm params={params} />;
};

export default HospitalAssessmentFormPage;
