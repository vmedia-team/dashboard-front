import { Box, Stack, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import fileImg from "../../../../../../assets/images/fileImg.png";
import { Checkbox } from "@mui/material";
import { DocumentationFileType } from "../../../../../../types/librariesAndDocs/DocumentationFile";
import { useContext, useEffect, useState } from "react";
import { LibraryDocumentionContext } from "../../../context/LibraryDocumentionContext";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";

export default function SingleDoc(props: PropsType) {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  console.log("location", location.state);
  const {
    handleSetActiveFile,
    checkedFileIdInSelectedFiles,
    toggleFileIdFormSelectedFiles,
  } = useContext(LibraryDocumentionContext);

  // TODO::if comming from file_name/refrance num search result show selected file
  useEffect(() => {
    if (location.state?.activeFile) {
      handleSetActiveFile(location.state?.activeFile);
    }
  }, []);

  return (
    <Stack
      spacing={1}
      alignItems={"center"}
      sx={{ p: 3, position: "relative", cursor: "pointer" }}
      onClick={(e) => {
        handleSetActiveFile(props.file);
        window.scrollTo({ top: 0, behavior: "smooth" });
        enqueueSnackbar(`تم عرض محتوي ملف ${props.file.name}`, {
          variant: "info",
        });
      }}
    >
      {/* checkbox */}
      <Checkbox
        checked={checkedFileIdInSelectedFiles(props.file.id)}
        onChange={(e) => {
          toggleFileIdFormSelectedFiles(props.file.id);
        }}
        sx={{
          position: "absolute",
          top: "5%",
          left: "5%",
        }}
      />
      {/* doc info */}
      <img src={fileImg} width={80} height={80} alt="file name" />
      <Typography variant="body1">{props.file?.name}</Typography>
      <Typography variant="body1" color={"error"}>
        {props.file?.reference_number}
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <CalendarMonthOutlinedIcon />
        <Typography variant="body2">{props.file?.end_date}</Typography>
      </Stack>
      <Box bgcolor={"#D2DCEA"}>عدد التحميل : {props.file?.downloaded}</Box>
    </Stack>
  );
}

type PropsType = {
  file: DocumentationFileType;
};
