import React from "react";
import { NextPage } from "next";
import Form from "@/modules/diploma/Form";

const DiplomaFormPage: NextPage<UuidFormPageProps> = ({ params }) => {
	return <Form params={params} />;
};

export default DiplomaFormPage;
