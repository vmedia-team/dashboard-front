import { useContext, useEffect } from "react";
import EntryPointStandredContract from "./EntryPoint";
import { StandredContractContextProvider } from "./context/StandredContractContext";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

function SetStandredContract() {
  // TODO::declare and define component state and variables
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

  
  // todo::set breadcrumb terms
  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "لوحة التحكم",
      path: "",
      disabled: true,
    });
    handleAddNewTerm({
      title: "العقود الموحدة",
      path: "/",
    });
  }, []);

  // return component ui
  return (
    <StandredContractContextProvider>
      <EntryPointStandredContract />
    </StandredContractContextProvider>
  );
}

export default SetStandredContract;
