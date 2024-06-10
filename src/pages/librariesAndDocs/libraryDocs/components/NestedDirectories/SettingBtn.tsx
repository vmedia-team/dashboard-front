import { Button, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useContext, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSnackbar } from "notistack";
import axios from "axios";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import { Api } from "../../../../../constants";
import { LibrariesMainPageItemType } from "../../../main/components/MainPaper/components/MianItemsData";
import ConfirmDeleteDialog from "./Dialog/ConfirmDeleteDialog";

export default function SettingBtn(props: PropsType) {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { deleteDirectory, handleSetSelectedNestedDirectory } = useContext(
    LibraryDocumentionContext
  );
  const { enqueueSnackbar } = useSnackbar();
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleSetSelectedNestedDirectory(props.item);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteDirectory = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (props.item.is_deletable == 0) {
      //cant delete
      enqueueSnackbar("لا يمكن حذف هذا الفولدر", { variant: "error" });
      return;
    }
    if (props.item.files_count > 0) {
      //show alert
      setOpenDialog(true);
    } else {
      enqueueSnackbar("جاري الحذف...", { variant: "info" });
      //direct delete
      axios
        .delete(Api(`employee/library/folder/delete/${props.item.id}`))
        .then(() => {
          deleteDirectory(props.item);
          enqueueSnackbar("تم الحذف بنجاح");
        })
        .catch((err) => {
          enqueueSnackbar("تعذر الحذف", { variant: "error" });
        });
    }
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        size="small"
        sx={{
          color: "#fff",
          position: "absolute",
          top: "5%",
          right: "5%",
        }}
        onClick={handleClick}
      >
        <SettingsOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Button
            variant="text"
            startIcon={<EditOutlinedIcon />}
            onClick={(e) => {
              props.handleEditDirectory(e);
              handleClose();
            }}
          >
            تعديل
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={(e) => {
              handleDeleteDirectory(e);
              handleClose();
            }}
          >
            حذف
          </Button>
        </MenuItem>
      </Menu>
      <ConfirmDeleteDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}

type PropsType = {
  handleEditDirectory: (e: React.MouseEvent<HTMLButtonElement>) => void;
  item: LibrariesMainPageItemType;
};
