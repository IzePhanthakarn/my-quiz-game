import React from "react";
import Drawer from "@mui/material/Drawer";
import Row from "../Row";
import Button from "@mui/material/Button";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setIsOpenDrawer } from "./redux";

interface Props {
  isOpen: boolean;
  content: React.ReactNode;
}

export default function BaseDrawer(props: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, content } = props;
  return (
    <Drawer
      sx={{ "& .MuiDrawer-paper": { width: 300 } }}
      anchor={"right"}
      open={isOpen}
    >
      <Row className="justify-end">
        <Button
          className="bg-red-400"
          onClick={() => dispatch(setIsOpenDrawer(false))}
        >
          ปิดจ้า
        </Button>
      </Row>
      {content}
    </Drawer>
  );
}
