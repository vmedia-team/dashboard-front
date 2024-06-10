import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CompressIcon from "@mui/icons-material/Compress";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import ConfirmFileProccess from "../ConfirmFileProccess";
import mergeImg from "../../../../../assets/images/librariesAndDocs/mergePDf.png";
import compressImg from "../../../../../assets/images/librariesAndDocs/compressPDF.png";

export default function ILovePdfFrameIndex(props: PropsType) {
  // TODO::declare and define component state and variables
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [operationType, setOperationType] = useState<"Merge" | "Compress">(
    "Merge"
  );
  const { activeFileToShow, selectedFilesIds, typeOfSelectedFiles } =
    useContext(LibraryDocumentionContext);

  // TODO::declare and define helper methods
  const handleClick = (type: "Merge" | "Compress") => {
    setOperationType(type);
    setOpenConfirmDialog(true);
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
      {typeOfSelectedFiles == "PDF" && (
        <Stack
          width={"98%"}
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Stack
            spacing={1}
            sx={{
              p: 2,
              cursor: "pointer",
              border: "2px solid gold",
              borderRadius: "12px",
            }}
            onClick={() => handleClick("Merge")}
          >
            <img
              src={mergeImg}
              width={68}
              height={68}
              alt="merge pdf"
              style={{
                width: "94px",
                height: "77px",
              }}
            />
            <Typography variant="body2" fontSize={10}>
              عدد الملفات المحددة : {selectedFilesIds.length} ملفات
            </Typography>
          </Stack>
          <Stack
            spacing={1}
            sx={{
              p: 2,
              cursor: "pointer",
              border: "2px solid gold",
              borderRadius: "12px",
            }}
            onClick={() => handleClick("Compress")}
          >
            <img
              src={compressImg}
              width={68}
              height={68}
              alt="merge pdf"
              style={{
                width: "94px",
                height: "77px",
              }}
            />
            <Typography variant="body2" fontSize={10}>
              عدد الملفات المحددة : {selectedFilesIds.length} ملفات
            </Typography>
          </Stack>
        </Stack>
      )}
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
