import { Stack } from "@mui/material";
import SingleDoc from "./SingleDoc";
import { useContext, useEffect } from "react";
import { LibraryDocumentionContext } from "../../../context/LibraryDocumentionContext";
import { Typography } from "@mui/material";
import NestedDirectoryItem from "../../NestedDirectories/SingleDirectory";

export default function ListOfLibraryDocs() {
  // TODO::define and declare component state and variables
  const { files, nestedDirectories } = useContext(LibraryDocumentionContext);
  console.log("nestedDirectories", nestedDirectories);

  return (
    <Stack direction={"row"} flexWrap={"wrap"} width={"100%"}>
      {nestedDirectories?.map((directory) => (
        <NestedDirectoryItem item={directory} />
      ))}
      {files?.map((ele) => (
        <SingleDoc file={ele} key={ele.id} />
      ))}
      {files?.length == 0 && nestedDirectories.length == 0 && (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={200}
        >
          <Typography variant="body1" fontSize={20} fontWeight={600}>
            لا يوجد ملفات فى هذا المجلد
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
