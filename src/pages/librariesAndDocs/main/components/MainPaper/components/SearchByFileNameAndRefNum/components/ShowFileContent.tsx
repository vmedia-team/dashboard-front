import { Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { LibraryMainPageContext } from "../../../../../context/LibraryMainPageContext";

export default function ShowFileContent(props: PropsType) {
  const { selectedResultFile } = useContext(LibraryMainPageContext);
  console.log("selectedResultFile", selectedResultFile);

  useEffect(() => {}, [props.url]);
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <iframe
        src={props.url ?? ""}
        width="94%"
        height="600px"
        style={{
          borderRadius: "12px",
        }}
      ></iframe>
    </Stack>
  );
}

type PropsType = {
  url: string;
};
