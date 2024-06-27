import { Stack } from "@mui/material";
import Tabs from "./Tabs";
import TasksContextProvider, { tasksContext } from "./context";
import Filters from "./Filters";
import ProgressSection from "./Progress";
import { useContext, useEffect } from "react";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

function MyTasks() {
  // todo::declare and define component state and variables
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

  // todo::set breadcrumb terms
  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "مشاريعي",
      path: "/react/tenders/controlpanel",
      disabled: true,
    });
    handleAddNewTerm({
      title: "مهامي",
      path: "/",
    });
  }, []);

  //return component ui
  return (
    <TasksContextProvider>
      <Component />
    </TasksContextProvider>
  );
}

function Component() {
  const { incomingTasks, ongoingTasks } = useContext(tasksContext);

  return (
    <Stack spacing={3}>
      {/* Filters Component */}
      <Filters />
      {/* Tabs */}
      <Tabs />
      {/* Progress Bar Component */}
      <ProgressSection
        incoming={incomingTasks?.length || 0}
        ongoing={ongoingTasks?.length || 0}
      />
    </Stack>
  );
}

export default MyTasks;
