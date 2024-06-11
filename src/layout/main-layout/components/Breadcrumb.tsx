import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useContext } from "react";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { MainBreadCrumbContext } from "../BreadCrumbContext/BreadCrumbContext";
import { BreadCrumbLinkType } from "../BreadCrumbContext";

function Breadcrumb() {
  const { links, handleClickOnTerm } = useContext(MainBreadCrumbContext);
  const navigator = useNavigate();

  /**
   * handle click on Breadcrumbs term
   * @param term clicked term
   */
  function handleClick(term: BreadCrumbLinkType, idx: number) {
    handleClickOnTerm(idx);
    navigator(term.path);
  }

  return (
    <Breadcrumbs separator={<NavigateBeforeIcon />}>
      {links?.map((term, idx) => (
        <Button
          disabled={idx == links.length - 1}
          sx={{ fontWeight: 700 }}
          onClick={() => handleClick(term, idx)}
        >
          {term.title}
        </Button>
      ))}
    </Breadcrumbs>
  );
}

const exclude = ["الموظفين", "مكتبة البيانات"];

export default Breadcrumb;
