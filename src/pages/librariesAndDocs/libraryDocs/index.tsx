import { Stack } from "@mui/material";
import LibraryDocsSearch from "./components/SearchBar";
import BranchesBtns from "./components/BranchesBtns";
import { LibraryDocumentionContextProvider } from "./context/LibraryDocumentionContext";
import MainContentIndex from "./components/MainContent";

export default function LibraryDocsIndex() {
  // TODO::declare and define component state and variables
  // TODO::declare and define component methods
  // TODO::return component view
  return (
    <Stack>
      <LibraryDocumentionContextProvider>
        <LibraryDocsSearch />
        <BranchesBtns />
        <MainContentIndex />
      </LibraryDocumentionContextProvider>
    </Stack>
  );
}
