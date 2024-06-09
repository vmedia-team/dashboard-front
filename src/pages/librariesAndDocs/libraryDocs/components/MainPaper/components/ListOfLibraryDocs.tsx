import { Stack } from "@mui/material";
import SingleDoc from "./SingleDoc";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { LibraryDocumentionContext } from "../../../context/LibraryDocumentionContext";
import AddEditLibDocDialog from "../../Dialog";
import { Typography } from "@mui/material";

export default function ListOfLibraryDocs() {
  // TODO::define and declare component state and variables
  let { libraryId } = useParams();
  const { files } = useContext(LibraryDocumentionContext);
  const [open, setOpen] = useState(false);

  return (
    <Stack direction={"row"} flexWrap={"wrap"} spacing={2} width={"100%"}>
      {files?.map((ele) => (
        <SingleDoc file={ele} key={ele.id} />
      ))}
      {files?.length == 0 && (
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
