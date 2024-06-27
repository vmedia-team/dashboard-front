import { useContext, useEffect } from "react";
import { SoilContextProvider } from "./SoilContext";
import SoilRequest from "./soilRequest";
import { SoilRequestTableContextProvider } from "./soilRequest/TableContext";
import { MainBreadCrumbContext } from "../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

export default function SoilSection() {
  // todo::declare and define component state and variables
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

  // todo::set breadcrumb terms
  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "مشاريعي",
      path: "/",
      disabled: true,
    });
    handleAddNewTerm({
      title: "التربة والخرسانة",
      path: "/",
    });
  }, []);

  return (
    <SoilRequestTableContextProvider>
      <SoilContextProvider>
        <SoilRequest />
      </SoilContextProvider>
    </SoilRequestTableContextProvider>
  );
}
