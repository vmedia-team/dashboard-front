import { Stack } from "@mui/material";
import SearchBar from "./components/SearchBar";
import MainPaper from "./components/MainPaper";
import { LibraryMainPageContextProvider } from "./context/LibraryMainPageContext";
import AggregationBtns from "./components/AggregationBtns";
import { useContext, useEffect } from "react";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

export default function LibrariesAndDocsMainIndex() {
  // todo::declare and define component state and variables
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  ); //get needed data from our context

  // todo::set breadcrumb terms
  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "مكتبة البيانات",
      path: "/react/librariesAndDocs",
    });
    handleAddNewTerm({
      title: "المجلدات الرئيسية",
      path: "/",
    });
  }, []);

  //return our component ui.
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
