import { Stack } from "@mui/material";
import SingleFileRow from "./SingleFileRow";
import { LibraryMainPageContext } from "../../../../../context/LibraryMainPageContext";
import { useContext } from "react";

export default function FilesList() {
  const { mainPageItems, searchInfiles } = useContext(LibraryMainPageContext);

  return (
    <Stack spacing={1} width={"100%"}>
      {mainPageItems?.map((directory) => {
        return directory?.files?.map((file) => (
          <SingleFileRow key={file.id} file={file} directory={directory} />
        ));
      })}
    </Stack>
  );
}
