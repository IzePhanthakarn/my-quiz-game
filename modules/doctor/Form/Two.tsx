import React, { useState } from "react";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form";
import { handleMultiForm } from "@/utils";

export default function Two() {
	const onFinish: FormProps<any>["onFinish"] = async (values: any) => {
		handleMultiForm(values);
	};

	const onFinishFailed: FormProps<any>["onFinishFailed"] = (_) => {};

	const initTest = {
		username: "",
		email: "",
		country: "",
	};

	const [test, setTest] = useState<any[]>([initTest]);

	const addForm = () => {
		setTest([...test, initTest]);
	};

	const removeForm = (index: number) => {
		setTest(test.filter((_, i) => i !== index));
	};

	return (
		<>
			<BaseButton label="เพิ่ม" onClick={addForm} />

			<div>
				<BaseForm
					name={"doctorForm"}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<>
						{test.map((_, key) => (
							<div key={key} className="grid grid-cols-4 gap-y-9 gap-x-8">
								<BaseItemInput
									label="doctorCode"
									itemName={`username${key}`}
									rules={[{ required: true }]}
								/>
								<BaseItemInput
									label="เลขทะเบียนวิชาชีพ"
									itemName={`email${key}`}
								/>
								<BaseItemInput
									label="เลขทะเบียน สปส"
									itemName={`country${key}`}
								/>
								<BaseButton label="ลบ" onClick={() => removeForm(key)} />
							</div>
						))}
						<BaseButton className="mt-20" label="บันทึก" htmlType="submit" />
					</>
				</BaseForm>
			</div>
		</>
	);
}
