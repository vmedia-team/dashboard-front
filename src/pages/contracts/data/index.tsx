import { useContext, useEffect } from "react";
import { ContractsContextProvider } from "../Context/ContractsContext";
import PageContent from "./PageContent";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";
function Contracts() {
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "العملاء",
      path: "/",
      disabled: true,
    });
    handleAddNewTerm({
      title: "ادارة العقود",
      path: "/",
    });
  }, []);

  return (
    <ContractsContextProvider>
      <PageContent />
    </ContractsContextProvider>
  );
}
export default Contracts;
