import { Paper, Stack } from "@mui/material";
import ControlSection from "./ControlSection";
import TendersTable from "./Table";
import TendersFilters from "./Filters";
import Counters from "./Counters";
import { TenderTableContextProvider } from "./TableContext";
import { useContext, useEffect, useState } from "react";
import CreateDialog from "./CreateDialog";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

function TendersData() {
  // todo::declare and define component state and variables
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

  // todo::set breadcrumb terms
  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "مشاريعي",
      path: "/react/tenders",
      disabled: true,
    });
    handleAddNewTerm({
      title: "منافسات",
      path: "/",
    });
  }, []);

  function handleOpenCreateDialog() {
    setOpenCreateDialog(true);
  }
  function handleCloseCreateDialog() {
    setOpenCreateDialog(false);
  }

  // * return component ui.
  return (
    <TenderTableContextProvider>
      <Stack>
        <CreateDialog
          open={openCreateDialog}
          onClose={handleCloseCreateDialog}
        />
        <TendersFilters />
        <Stack component={Paper} spacing={2} p={3}>
          <ControlSection openCreateDialog={handleOpenCreateDialog} />
          <Counters />
          <TendersTable openCreateDialog={handleOpenCreateDialog} />
        </Stack>
      </Stack>
    </TenderTableContextProvider>
  );
}

export default TendersData;
