import { Stack } from "@mui/material";
import SearchBar from "./components/SearchBar";
import MainPaper from "./components/MainPaper";
import { LibraryMainPageContextProvider } from "./context/LibraryMainPageContext";
import AggregationBtns from "./components/AggregationBtns";
import { useContext, useEffect } from "react";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

export default function LibrariesAndDocsMainIndex() {
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "مكتبة البيانات",
      path: "/react/librariesAndDocs",
    });
    handleAddNewTerm({
      title: "مشاريعي",
      path: "/",
    });
  }, []);

  return (
    <Stack>
      <LibraryMainPageContextProvider>
        <SearchBar />
        <AggregationBtns />
        <MainPaper />
      </LibraryMainPageContextProvider>
    </Stack>
  );
}
