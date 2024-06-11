import { Box, IconButton, Stack, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import fileImg from "../../../../../../assets/images/fileImg.png";
import { Checkbox } from "@mui/material";
import { DocumentationFileType } from "../../../../../../types/librariesAndDocs/DocumentationFile";
import { useContext, useEffect, useState } from "react";
import { LibraryDocumentionContext } from "../../../context/LibraryDocumentionContext";
import { useLocation } from "react-router-dom";
import { Chip } from "@mui/material";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import axios from "axios";
import { Api } from "../../../../../../constants";
import ConfirmDeleteFileDialog from "./ConfirmDeleteFile";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SingleDoc(props: PropsType) {
  // TODO::declare and define component state and variables
  const location = useLocation(); //to get incomming location state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const {
    handleSetActiveFile,
    checkedFileIdInSelectedFiles,
    toggleFileIdFormSelectedFiles,
    handleOenDialog,
    handleSetEditFile,
    typeOfSelectedFiles,
  } = useContext(LibraryDocumentionContext); //get needed data from our context
  //* get and prepare file extention
  let extention = "null";
  if (props.file?.media?.[0]?.original_url) {
    let idx = props.file?.media?.[0]?.original_url.lastIndexOf(".");
    extention = props.file?.media?.[0]?.original_url.substring(idx + 1);
  }
  //* get and prepare file type
  let fileType: MediaType = props.file?.media?.[0]?.original_url?.includes(
    ".pdf"
  )
    ? "PDF"
    : extention != "null"
    ? "Image"
    : "Unkown";
  //* prepare file name
  let fileName =
    props.file?.name?.length > 11
      ? `${props.file?.name?.slice(0, 11)}...`
      : props.file?.name;

  // TODO::if comming from file_name/refrance num search result show selected file
  useEffect(() => {
    if (location.state?.activeFile) {
      handleSetActiveFile(location.state?.activeFile);
    }
  }, []);

  // TODO::declare and define helper methods
  const handleDownloadFile = () => {
    if (props.file?.media?.[0]?.original_url) {
      axios
        .get<{ file: DocumentationFileType }>(
          Api(`employee/library/file/show/${props.file?.id}`)
        )
        .then((response) => {
          handleSetActiveFile(response.data.file);
          window.open(props.file?.media?.[0]?.original_url, "_blank");
        })
        .catch((err) => {});
    }
  };

  const handleDeleteFile = () => {
    setOpenDeleteDialog(true);
  };
  const handleEdit = () => {
    handleSetEditFile(true);
    console.log("breakpoint1999 file", props.file);
    handleSetActiveFile(props.file);
    handleOenDialog(true);
  };

  //*return component state
  return (
    <>
      <Stack
        spacing={1}
        alignItems={"center"}
        sx={{ p: 3, position: "relative", width: "200px" }}
      >
        {/* checkbox */}
        <Checkbox
          disabled={
            typeOfSelectedFiles != undefined && typeOfSelectedFiles != fileType
          }
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
        {/* file preview */}
        <Box
          sx={{
            position: "relative",
            width: 100,
            height: 100,
            marginTop: "20px 5px",
          }}
        >
          {/* image for preview */}
          {fileType == "PDF" ? (
            <iframe
              id="myIframe"
              src={props.file?.media?.[0]?.original_url}
              width="100px"
              height="100px"
              scrolling="no"
              style={{
                position: "absolute",
                borderRadius: "0",
                overflow: "hidden",
              }}
            ></iframe>
          ) : (
            <img
              src={props.file?.media?.[0]?.original_url ?? fileImg}
              width={100}
              height={100}
              alt="file name"
            />
          )}
          {/* extention */}
          <Chip
            label={extention}
            size="small"
            sx={{
              position: "absolute",
              bottom: "0%",
              left: "0%",
              fontSize: 10,
              borderRadius: "0px",
            }}
            color={
              extention == "pdf"
                ? "info"
                : extention == "null"
                ? "error"
                : "warning"
            }
          />
          {/* actions */}
          {/* download */}
          <IconButton
            sx={{
              position: "absolute",
              bottom: "0%",
              right: "0%",
              boxShadow: "0px 4px 9.5px 0px #0000001F",
              borderRadius: "3px",
            }}
            onClick={() => handleDownloadFile()}
          >
            <CloudDownloadOutlinedIcon />
          </IconButton>
          {/* delete */}
          <IconButton
            sx={{
              position: "absolute",
              top: "0%",
              left: "0%",
              borderRadius: "3px",
            }}
            onClick={() => handleDeleteFile()}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
          {/* edit */}
          <IconButton
            sx={{
              position: "absolute",
              top: "0%",
              right: "0%",
              boxShadow: "0px 4px 9.5px 0px #0000001F",
              borderRadius: "3px",
            }}
            onClick={() => handleEdit()}
          >
            <BorderColorOutlinedIcon />
          </IconButton>
        </Box>
        {/* File information */}
        <Stack
          alignItems={"center"}
          sx={{
            cursor: "pointer",
          }}
          onClick={(e) => {
            handleSetActiveFile(props.file);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Typography variant="body1">{fileName}</Typography>
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
      </Stack>
      <ConfirmDeleteFileDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        file={props.file}
      />
    </>
  );
}

type MediaType = "Image" | "PDF" | "Unkown";
type PropsType = {
  file: DocumentationFileType;
};
