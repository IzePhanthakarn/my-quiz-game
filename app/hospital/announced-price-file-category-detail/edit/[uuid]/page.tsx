import React from "react";
import { NextPage } from "next";
import Form from "@/modules/hospital/announced-price-file-category-detail/Form";

const HospitalAnnouncedPriceFileCategoryDetailFormPage: NextPage<
	HospitalAnnouncedPriceFileCategoryDetailFormPageProps
> = ({ params }) => {
	return <Form params={params} />;
};

export default HospitalAnnouncedPriceFileCategoryDetailFormPage;
