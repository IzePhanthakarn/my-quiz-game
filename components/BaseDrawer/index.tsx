import React from "react";
import Drawer from "@mui/material/Drawer";
import Row from "../Row";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { setIsOpenDrawer } from "./redux";
import CloseIcon from "@mui/icons-material/Close";
interface Props {
  isOpen: boolean;
  content: React.ReactNode;
  label?: string;
}

export default function BaseDrawer(props: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, content, label } = props;
  return (
    <Drawer
      sx={{ "& .MuiDrawer-paper": { width: 300, padding: "12px" } }}
      anchor={"right"}
      open={isOpen}
    >
      <Row className="justify-between items-center py-2">
        <p className="text-2xl">{label ?? ""}</p>
        <CloseIcon
          onClick={() => dispatch(setIsOpenDrawer(false))}
          className="cursor-pointer"
        />
      </Row>
      {content}
    </Drawer>
  );
}
