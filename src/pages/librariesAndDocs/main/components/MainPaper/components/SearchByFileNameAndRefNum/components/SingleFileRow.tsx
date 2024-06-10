import { Box, Button, Stack, Typography } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { DocumentationFileType } from "../../../../../../../../types/librariesAndDocs/DocumentationFile";
import { LibrariesMainPageItemType } from "../../MianItemsData";
import { useContext } from "react";
import { LibraryMainPageContext } from "../../../../../context/LibraryMainPageContext";
import { useNavigate } from "react-router-dom";
import imageType from "../../../../../../../../assets/images/librariesAndDocs/imageTpe.png";
import pdfType from "../../../../../../../../assets/images/librariesAndDocs/pdfType.png";

export default function SingleFileRow(props: PropsType) {
  const { handleSetSelectedResultFile } = useContext(LibraryMainPageContext);
  const navigator = useNavigate();
  //* get and prepare file extention
  let extention = "null";
  if (props.file?.media?.[0]?.original_url) {
    let idx = props.file?.media?.[0]?.original_url.lastIndexOf(".");
    extention = props.file?.media?.[0]?.original_url.substring(idx + 1);
  }
  //* get and prepare file type
  let fileType: string = props.file?.media?.[0]?.original_url?.includes(".pdf")
    ? "PDF"
    : extention != "null"
    ? "Image"
    : "Unkown";

  const handleClick = () => {
    navigator(`${props.directory?.id ?? ""}`, {
      state: {
        activeFile: props.file,
      },
    });
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{
        borderBottom: "2px solid orange",
        padding: 1,
        width: "100%",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => {
          handleSetSelectedResultFile(props.file);
        }}
        sx={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        <img
          src={fileType == "PDF" ? pdfType : imageType}
          width={30}
          height={30}
          alt="file name"
          style={{
            margin: "0 5px",
          }}
        />
        <Typography variant="body2" fontSize={18} fontWeight={600}>
          {props.directory?.name} / {props.file?.name}
        </Typography>
      </Stack>
      <Button variant="outlined" color="info" onClick={handleClick}>
        التفاصيل
      </Button>
    </Stack>
  );
}

type PropsType = {
  file: DocumentationFileType;
  directory: LibrariesMainPageItemType;
};
