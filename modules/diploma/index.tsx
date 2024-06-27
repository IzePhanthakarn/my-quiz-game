import page from "@/app/clinic/page";

import React from "react";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MasterData from "wcf-component-lib/src/layout/MasterData";
import BaseDrawer from "wcf-component-lib/src/components/BaseDrawer";
import Input from "antd/es/input";
import Button from "antd/es/button";

export default function Diploma() {
	return (
		<div>
			{/* <MasterData
				Grid={
					<BaseGrid
						rows={rows}
						loading={false}
						columns={clinicColumns}
						page={page}
						setPagination={setPage}
					/>
				}
				Drawer={
					<BaseDrawer
						isOpen={isDrawerOpen}
						setIsOpen={setDrawerOpen}
						content={<div>Content</div>}
					/>
				}
				FilterTextField={<Input className="w-[300px]" />}
				FilterButton={<Button>Filter</Button>}
				AddFunction={() => console.log("Add")}
				AddLabel="เพิ่มคลินิค"
				Header="Clinic"
				SubHeader="List Clinic"
			/> */}
		</div>
	);
}
