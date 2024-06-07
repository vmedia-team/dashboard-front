import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import LibraryDocsSearch from "./components/SearchBar";
import LibraryDocsMainPaper from "./components/MainPaper";
import BranchesBtns from "./components/BranchesBtns";
import { useState } from "react";
import ILovePdfFrameIndex from "./components/ILovePdfFrame";

export default function LibraryDocsIndex() {
  // TODO::declare and define component state and variables
  const [showPdfFrame, setShowPdfFrame] = useState(true);
  const fileUrl = "https://clickdimensions.com/links/TestPDFfile.pdf";
  // TODO::declare and define component methods
  // TODO::return component view
  return (
    <Stack>
      <LibraryDocsSearch />
      <BranchesBtns />
      <Stack direction={"row"}>
        <LibraryDocsMainPaper width={showPdfFrame ? "60%" : "100%"} />
        {showPdfFrame && <ILovePdfFrameIndex fileUrl={fileUrl} />}
      </Stack>
    </Stack>
  );
}
