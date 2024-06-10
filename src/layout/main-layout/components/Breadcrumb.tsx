import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useContext } from "react";
import { BreadCrumbContext } from "../BreadCrumbContext";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { MainBreadCrumbContext } from "../BreadCrumbContext/BreadCrumbContext";

function Breadcrumb() {
  const breadcrumbContext = useContext(BreadCrumbContext);
  const { links } = useContext(MainBreadCrumbContext);

  return (
    <Breadcrumbs separator={<NavigateBeforeIcon />}>
      {links?.map((term, idx) => (
        <Button
          disabled={idx == links.length - 1}
          component={NavLink}
          sx={{ fontWeight: 700 }}
          to={term.path}
        >
          {term.title}
        </Button>
      ))}
    </Breadcrumbs>
  );
}

const exclude = ["الموظفين", "مكتبة البيانات"];

export default Breadcrumb;
