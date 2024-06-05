import Row from "@/components/Row";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import React from "react";

export default function RequiredDoc() {
  return (
    <FormControl>
      {/* id="demo-controlled-radio-buttons-group" */}
      <FormLabel>เลือกรายการเอกสารที่ขอเพิ่ม</FormLabel>
      <RadioGroup
      // aria-labelledby="demo-controlled-radio-buttons-group"
      // name="controlled-radio-buttons-group"
      //   value={value}
      //   onChange={handleChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="กท 16" />
        <FormControlLabel value="male" control={<Radio />} label="กท 44" />
        <FormControlLabel value="male" control={<Radio />} label="ใบแจ้งหนี้" />
        <FormControlLabel
          value="male"
          control={<Radio />}
          label="ใบเสร็จรับเงิน"
        />
        <FormControlLabel
          value="male"
          control={<Radio />}
          label="ใบรับรองแพทย์"
        />
        <FormControlLabel
          value="male"
          control={<Radio />}
          label="ประวัติการรักษา"
        />
        <Row className="items-center">
          <FormControlLabel value="other" control={<Radio />} label="อื่น ๆ" />
          <TextField placeholder="โปรดระบุ" />
        </Row>
      </RadioGroup>
    </FormControl>
  );
}
