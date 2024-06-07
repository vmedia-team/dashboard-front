import { Stack } from "@mui/material";
import WebViewer from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

export default function ILovePdfFrameIndex(props: PropsType) {
  // TODO::declare and define component state and variables
  const viewerDiv = useRef<HTMLDivElement>(null);
  const beenInitialised = useRef<Boolean>(false);

  // TODO::declare and define helper methods
  // useEffect(() => {
  //   if (!beenInitialised.current) {
  //     beenInitialised.current = true;
  //     console.log("props.fileUrl", props.fileUrl);
  //     WebViewer(
  //       {
  //         path: "/lib",
  //         initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
  //         //licenseKey:"demo:1717486200042:7fad91c5030000000071a9bc88e766006d43d20c2c895c7d60d6a0782f",
  //       },
  //       viewerDiv.current as HTMLDivElement
  //     )
  //       .then(() => {
  //         console.log("show pdf done successfully instance is = ");
  //       })
  //       .catch((err) => {
  //         console.log("Error in show pdf::", err);
  //       });
  //   }
  // }, [props.fileUrl, viewerDiv.current]);

  useEffect(() => {}, [props.fileUrl]);
  // TODO::return component ui
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "100vh", width: "100%" }}
    >
      {/* <div
        id="pdfViewerDiv"
        ref={viewerDiv}
        style={{
          width: "90%",
          height: "100vh",
        }}
      ></div> */}
      <iframe
        src={props.fileUrl}
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
  fileUrl: string;
};
