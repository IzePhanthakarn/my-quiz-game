import React from "react";
import { AppDispatch } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import Row from "../Row";
import CloseIcon from "@mui/icons-material/Close";
import { setIsOpenDialog } from "./redux";

interface Props {
  isOpen: boolean;
  content: React.ReactNode;
  label?: string;
}

export default function BaseDrawer(props: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, content, label } = props;
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: 600, padding: "12px" } }}
      open={isOpen}
    >
      <Row className="justify-between items-center py-2">
        <p className="text-2xl">{label ?? ""}</p>
        <CloseIcon
          onClick={() => dispatch(setIsOpenDialog(false))}
          className="cursor-pointer"
        />
      </Row>
      {content}
    </Dialog>
  );
}
