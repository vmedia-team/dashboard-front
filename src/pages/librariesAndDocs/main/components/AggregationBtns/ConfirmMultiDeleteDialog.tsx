import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { Dialog } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useContext, useEffect, useState } from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import axios from "axios";
import { useSnackbar } from "notistack";
import { LibraryMainPageContext } from "../../context/LibraryMainPageContext";
import { Api } from "../../../../../constants";

export default function ConfirmDeleteDirectory(props: PropsType) {
  // TODO::declare and define state and variables
  const [loading, setLoading] = useState(false);
  const {
    selectedDirectoriedIds,
    deleteMultiDirectories,
    handleSetOpenDeleteDialog,
  } = useContext(LibraryMainPageContext);
  const { enqueueSnackbar } = useSnackbar();

  // TODO::declare and define helper methods
  const handleClose = () => {
    handleSetOpenDeleteDialog(false);
  };

  const handleDeleteDirectory = () => {
    setLoading(true);
    axios
      .post(Api(`employee/library/folder/multi-delete`), {
        ids: selectedDirectoriedIds,
      })
      .then(() => {
        deleteMultiDirectories();
        enqueueSnackbar("تم الحذف بنجاح");
        handleClose();
      })
      .catch((err) => {
        enqueueSnackbar("تعذر الحفظ", { variant: "error" });
      })
      .finally(() => setLoading(false));
  };

  // * return our component ui
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Stack direction={"row"} mt={4}>
          <ErrorOutlineOutlinedIcon
            color="warning"
            sx={{
              fontSize: 60,
            }}
          />
          <Box pl={3}>
            <Typography variant="body1" fontSize={18} fontWeight={600}>
              برجاء الملاحظة
            </Typography>
            <Typography variant="body2" fontSize={14} fontWeight={500}>
              الفولدرات التي ترغب بحذفها بعض منها يحتوي علي ملفات بداخله
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        {loading && (
          <Typography sx={{ flexGrow: 1 }} px={5}>
            جاري تنفيذ العملية...
          </Typography>
        )}
        <Button
          disabled={loading}
          variant="contained"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteDirectory();
          }}
        >
          حذف
        </Button>
        <Button
          color="success"
          disabled={loading}
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          رجوع
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
};
