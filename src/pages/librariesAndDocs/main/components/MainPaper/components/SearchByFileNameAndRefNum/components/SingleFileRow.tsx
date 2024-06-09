import { Box, Button, Stack, Typography } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { DocumentationFileType } from "../../../../../../../../types/librariesAndDocs/DocumentationFile";
import { LibrariesMainPageItemType } from "../../MianItemsData";
import { useContext } from "react";
import { LibraryMainPageContext } from "../../../../../context/LibraryMainPageContext";

export default function SingleFileRow(props: PropsType) {
  const { handleSetSelectedResultFile } = useContext(LibraryMainPageContext);

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
        <InsertDriveFileOutlinedIcon sx={{ fontSize: 25 }} />
        <Typography variant="body2" fontSize={18} fontWeight={600}>
          {props.directory?.name} / {props.file?.name}
        </Typography>
      </Stack>
      <Button variant="outlined" color="info">
        التفاصيل
      </Button>
    </Stack>
  );
}

type PropsType = {
  file: DocumentationFileType;
  directory: LibrariesMainPageItemType;
};
