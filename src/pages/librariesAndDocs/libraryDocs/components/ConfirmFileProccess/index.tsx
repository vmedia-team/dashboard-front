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
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import axios from "axios";
import { Api } from "../../../../../constants";
import { useSnackbar } from "notistack";

export default function ConfirmFileProccess(props: PropsType) {
  // TODO::declare and define state and variables
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { files, selectedFilesIds } = useContext(LibraryDocumentionContext);
  const [filesList, setFilesList] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    let arr = files
      .filter((ele) => selectedFilesIds.indexOf(ele.id) != -1)
      .map((ele) => ({ id: ele.id, name: ele.name }));
    setFilesList(arr);
  }, [props.open]);
  // TODO::declare and define helper methods
  const handleClose = () => {
    props.setOpen(false);
  };
  const handleFileProcessing = () => {
    setLoading(true);
    let url =
      props.operationType == "Merge"
        ? "employee/library/file-process/merge"
        : "employee/library/file-process/compress";
    axios
      .post(Api(url), {
        ids: selectedFilesIds,
      })
      .then((response) => {
        enqueueSnackbar("تم اجراء العملية بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر اتمام العملية", { variant: "error" });
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
              سوف تقوم بعملية {props.operationType} للملفات الاتية
            </Typography>
            <List>
              {filesList.map((ele) => (
                <ListItem key={ele.id} disablePadding>
                  <ListItemIcon>
                    <InsertDriveFileOutlinedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={ele.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        {loading && (
          <Typography sx={{ flexGrow: 1 }} px={5}>
            جاري اجراء العملية...
          </Typography>
        )}
        <Button
          disabled={loading}
          variant="contained"
          color="success"
          onClick={handleFileProcessing}
        >
          متابعة
        </Button>
        <Button disabled={loading} variant="text" onClick={handleClose}>
          رجوع
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  operationType: "Merge" | "Compress";
};
