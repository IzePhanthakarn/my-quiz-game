import React from "react";
import { NextPage } from "next";
import Form from "@/modules/document/Form";

const DocumentFormPage: NextPage<DocumentFormPageProps> = ({ params }) => {
	return <Form params={params} />;
};

export default DocumentFormPage;
