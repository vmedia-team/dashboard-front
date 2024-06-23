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
import { useContext, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { LibraryDocumentionContext } from "../../../context/LibraryDocumentionContext";
import { Api } from "../../../../../../constants";

export default function ConfirmDeleteFileDialog(props: PropsType) {
  // TODO::declare and define state and variables
  const [loading, setLoading] = useState(false);
  const { deleteSelectedFiles, handleHideShowDeleteDialog, selectedFilesIds } =
    useContext(LibraryDocumentionContext);
  const { enqueueSnackbar } = useSnackbar();

  // TODO::declare and define helper methods
  const handleClose = () => {
    handleHideShowDeleteDialog(false);
  };

  const handleDeleteDirectory = () => {
    setLoading(true);
    axios
      .post(Api(`employee/library/file/multi-delete`), {
        ids: selectedFilesIds,
      })
      .then(() => {
        if (selectedFilesIds.length) {
          deleteSelectedFiles();
          enqueueSnackbar("تم الحذف بنجاح");
        }
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
              fontSize: 30,
            }}
          />
          <Box pl={3}>
            <Typography
              variant="body1"
              color={"warning"}
              fontSize={16}
              fontWeight={600}
            >
              هل انت متاكد من حذف{" "}
              {selectedFilesIds.length > 1 ? "هذه الملفات" : "هذا الملف"}؟
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
