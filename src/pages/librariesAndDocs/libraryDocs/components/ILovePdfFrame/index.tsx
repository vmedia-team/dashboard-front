import { Button, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CompressIcon from "@mui/icons-material/Compress";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import ConfirmFileProccess from "../ConfirmFileProccess";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import axios from "axios";
import { Api } from "../../../../../constants";
import { DocumentationFileType } from "../../../../../types/librariesAndDocs/DocumentationFile";

export default function ILovePdfFrameIndex(props: PropsType) {
  // TODO::declare and define component state and variables
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [operationType, setOperationType] = useState<"Merge" | "Compress">(
    "Merge"
  );
  const { activeFileToShow, selectedFilesIds, handleSetActiveFile } =
    useContext(LibraryDocumentionContext);

  // TODO::declare and define helper methods
  const handleClick = (type: "Merge" | "Compress") => {
    setOperationType(type);
    setOpenConfirmDialog(true);
  };

  const handleDownloadFile = () => {
    if (activeFileToShow?.media?.[0]?.original_url) {
      axios
        .get<{ file: DocumentationFileType }>(
          Api(`employee/library/file/show/${activeFileToShow.id}`)
        )
        .then((response) => {
          handleSetActiveFile(response.data.file);
          window.open(activeFileToShow?.media?.[0]?.original_url, "_blank");
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {}, [props.fileUrl]);
  // TODO::return component ui
  return (
    <Stack
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      mt={5}
      sx={{ height: "100vh", width: "100%" }}
    >
      <Typography variant="subtitle1" my={2} textAlign={"left"}>
        عرض ملف : {activeFileToShow?.name}
      </Typography>
      <iframe
        src={props.fileUrl}
        width="94%"
        height="600px"
        style={{
          borderRadius: "12px",
        }}
      ></iframe>
      <Grid container>
        <Grid item xs={6} p={2} textAlign={"center"}>
          <Button
            onClick={() => handleClick("Merge")}
            variant="contained"
            startIcon={<ContentCopyIcon />}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle1">Merge Files</Typography>
              <Typography variant="body2" fontSize={10}>
                عدد الملفات المحددة : {selectedFilesIds.length} ملفات
              </Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={6} p={2} textAlign={"center"}>
          <Button
            onClick={() => handleClick("Compress")}
            variant="contained"
            startIcon={<CompressIcon />}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle1">Compress Files</Typography>
              <Typography variant="body2" fontSize={10}>
                عدد الملفات المحددة : {selectedFilesIds.length} ملفات
              </Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={6} p={2} textAlign={"center"}>
          <Button
            onClick={handleDownloadFile}
            variant="contained"
            startIcon={<GetAppOutlinedIcon />}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle1">Download File</Typography>
              <Typography variant="body2" fontSize={10}>
                عدد التحميلات لملف : {activeFileToShow?.downloaded ?? 0}
              </Typography>
            </Stack>
          </Button>
        </Grid>
      </Grid>
      <ConfirmFileProccess
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        operationType={operationType}
      />
    </Stack>
  );
}

type PropsType = {
  fileUrl: string;
};
