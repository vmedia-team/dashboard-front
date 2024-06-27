import { Stack } from "@mui/material";
import ClassificationCard from "../../DesignReports/components/classificationCard/ClassificationCard";
import ClassificationCardContainer from "./ClassificationCard/ClassificationCardContainer";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Views from "./Views";
import axios from "axios";
import { Api } from "../../../constants";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

function DesignDataPage() {
  const [currentTab, setCurrentTab] = useState(1);
  const [counts, setCounts] = useState<undefined | Counts>(undefined);
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );

  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "الخدمات",
      path: "/",
      disabled: true,
    });
    handleAddNewTerm({
      title: "خدمات التصاميم",
      path: "/",
    });

    axios
      .get<Counts>(Api("client/design"), { headers: { from: "dashboard" } })
      .then(({ data }) => {
        setCounts(data);
      });
  }, []);

  const isCurrentTab = (tab: number) => tab === currentTab;
  const setThisTab = (tab: number) => () => setCurrentTab(tab);

  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} mb={3}>
        أختر التصنيف
      </Typography>
      <ClassificationCardContainer>
        <ClassificationCard
          isCurrentTab={isCurrentTab(1)}
          setThisTab={setThisTab(1)}
          title="مشاريع التصميم"
          count={counts?.["count-all"]}
        />
        <ClassificationCard
          isCurrentTab={isCurrentTab(2)}
          setThisTab={setThisTab(2)}
          title="طلبات الشراء"
          count={counts?.["count-payed"]}
        />
        <ClassificationCard
          disabled
          isCurrentTab={isCurrentTab(3)}
          setThisTab={setThisTab(3)}
          title="مشاريع جارية"
          count={counts?.["count-loading"]}
        />
      </ClassificationCardContainer>
      <Views currentPage={currentTab} />
      {/* Search Filters */}
    </Stack>
  );
}

type Counts = {
  count: number;
  "count-all": number;
  "count-loading": number;
  "count-payed": number;
};

export default DesignDataPage;
