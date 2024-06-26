import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Stack,
  TextField,
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
  const [fileName, setFileName] = useState("");
  const [fileNameError, setFileNameError] = useState(false);
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
      props.operationType === "Merge"
        ? "employee/library/file-process/merge"
        : "employee/library/file/compress";

    let body =
      props.operationType === "Merge"
        ? { ids: selectedFilesIds }
        : { ids: selectedFilesIds, name: fileName };
    //check in compress case file name is founded
    if (props.operationType === "Compress") {
      if (!fileName) {
        setFileNameError(true);
        setLoading(false);
        return;
      }
    }

    axios
      .post(Api(url), {
        ...body,
      })
      .then((response) => {
        enqueueSnackbar("تم اجراء العملية بنجاح");
        handleClose();
      })
      .catch((err) => {
        let errMsg = "تعذر اتمام العملية";
        if (err.response.data.msg == "Undefined array key 0")
          errMsg = "يجب ان تكون كل الملفات من نوع pdf";
        enqueueSnackbar(errMsg, { variant: "error" });
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
            <Stack width={'100%'} direction={"row"} justifyContent={"space-around"}>
              <Box width={props.operationType === "Compress" ? "48%" : "100%"}>
                <List>
                  {filesList.length == 0 && (
                    <Typography variant="body2" color={"warning"}>
                      انت لم تقوم باختيار اي ملف
                    </Typography>
                  )}
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

              {props.operationType === "Compress" && (
                <>
                  <Divider orientation="vertical" flexItem />
                  <Box width={"48%"} mx={1}>
                    <TextField
                      id="standard-basic"
                      label="أدخل أسم الملف"
                      variant="standard"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      error={fileNameError}
                      fullWidth
                      helperText={
                        fileNameError
                          ? "اسم الملف مطلوب."
                          : "اسم الملف الناتج من عملية compress"
                      }
                    />
                  </Box>
                </>
              )}
            </Stack>
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
          color="success"
          onClick={handleFileProcessing}
        >
          متابعة
        </Button>
        <Button
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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  operationType: "Merge" | "Compress";
};
