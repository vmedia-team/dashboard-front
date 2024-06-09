import { Stack } from "@mui/material";
import { useEffect } from "react";

export default function ShowFileContent(props: PropsType) {
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
