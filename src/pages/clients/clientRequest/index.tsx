import axios from "axios";
import { Api } from "../../../constants";
import { Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import LoadingTable from "../../../components/LoadingTable";
import { PanelData, StepStatusData } from "./types";
import reducer, { FiltersInit } from "./Filter/reducer";
import ClientTableComponent from "./Table";
import SearchBar from "./SearchBar";
import { CountType } from "../../../types/Count";
import RequestTypesToggles from "./Toggles";

import { FormData } from "../clientsProcess/types/FormData";
import { OrderType } from "../clientsProcess/types/OrderType";
import ModelDialog from "./Dialogs/ModelDialog";
import DetailsDialog from "./Dialogs/DetailsDialog";
import StatusDialog from "./Dialogs/StatusDialog";
import FinanceDialog from "./Dialogs/financeDialog";
import ReportDialog from "./Dialogs/reportDialog";
import TestDialog from "./Dialogs/testDialog";
import VisitDialog from "./Dialogs/visitDialog";
import AcceptDialog from "./Dialogs/acceptDialog";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

const ClientRequests = () => {
  const tableRef: React.RefObject<HTMLTableElement> =
    useRef<HTMLTableElement>(null);
  const handlePrint = () => {
    if (tableRef.current) {
      window.print();
    }
  };
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );
  const [filters, dispatch] = useReducer(reducer, FiltersInit);
  const [currentTab, setCurrentTab] = useState<string>("");
  const [requests, setRequests] = useState<
    PanelData[] | StepStatusData[] | "loading" | "none" | "error"
  >("loading");
  const [dialogRequest, setDialogRequest] = useState<
    PanelData | StepStatusData | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState<
    | undefined
    | "model"
    | "status"
    | "details"
    | "accept"
    | "finance"
    | "report"
    | "test"
    | "visit"
  >(undefined);
  const [selectedType, setSelectedType] = useState<number | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState<CountType[] | null>(null);
  const [orderType, setOrderType] = useState<OrderType[]>();

  const getRequests = () => {
    setRequests("loading");
    axios
      .get<{ data: PanelData[] }>(Api("employee/client/order"), {
        params: {
          limit: filters.limit || null,
          typeClient: filters.typeClient || null,
          search: search || null,
          dateFrom: filters.dateFrom || null,
          dateTo: filters.dateTo || null,
          department_id: filters.department_id || null,
          typeOrder: filters.typeOrder || null,
          sortBy: filters.sortBy || null,
          status: filters.status || null,
        },
      })
      .then(({ data }) => {
        setRequests(data.data);
        // setCounts(data.count);
      })
      .catch((err) => {
        setRequests("error");
      });
  };

  const getFormData = () => {
    return new Promise<void>((resSolve, reject) => {
      axios
        .get<FormData>(Api("employee/client/order/steps/use"))
        .then((res) => {
          setOrderType(res.data.typeOrder);
          resSolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const handleOpenModel = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogOpen("model");
      setDialogRequest(request);
    };
  };
  const handleOpenStatus = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("status");
    };
  };
  const handleOpenDetails = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("details");
    };
  };
  const handleOpenFinance = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("finance");
    };
  };
  const handleOpenVisit = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("visit");
    };
  };
  const handleOpenReport = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("report");
    };
  };
  const handleOpenTest = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("test");
    };
  };
  const handleOpenAccept = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("accept");
    };
  };
  const handleCloseDialog = () => {
    setDialogOpen(undefined);
  };

  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "العملاء",
      path: "/",
      disabled: true,
    });
    handleAddNewTerm({
      title: "طلبات العملاء",
      path: "/",
    });
    getRequests();
    getFormData();
  }, [
    selectedType,
    currentTab,
    filters.limit,
    filters.dateFrom,
    filters.dateTo,
    filters.department_id,
    filters.sortBy,
    filters.typeClient,
    filters.status,
    filters.typeOrder,
  ]);
  const IS_REQUESTS_EXISTS = typeof requests === "object";
  let filtered: PanelData[] | undefined = IS_REQUESTS_EXISTS
    ? requests
    : undefined;

  return (
    <>
      <ModelDialog
        open={dialogOpen === "model"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
        setRequests={getRequests}
      />
      <DetailsDialog
        open={dialogOpen === "details"}
        requestId={dialogRequest?.id}
        onClose={handleCloseDialog}
      />
      <StatusDialog
        open={dialogOpen === "status"}
        onClose={handleCloseDialog}
        setRequests={setRequests}
        id={dialogRequest?.id}
      />
      <FinanceDialog
        open={dialogOpen === "finance"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
        setRequests={getRequests}
      />
      <AcceptDialog
        open={dialogOpen === "accept"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
        setRequests={getRequests}
      />

      <ReportDialog
        open={dialogOpen === "report"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
        setRequests={getRequests}
      />
      <TestDialog
        open={dialogOpen === "test"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
        setRequests={getRequests}
      />
      <VisitDialog
        open={dialogOpen === "visit"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
        setRequests={getRequests}
      />

      <Stack>
        <Typography variant="h5" fontWeight={600} mb={3}>
          طلبات العملاء
        </Typography>

        <SearchBar
          applySearch={getRequests}
          search={search}
          setSearch={setSearch}
          dispatch={dispatch}
          filters={filters}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          tableRef={tableRef}
          handlePrint={handlePrint}
          orderType={orderType}
        />

        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          flexDirection="row-reverse"
          flexWrap="wrap"
          alignItems="end"
        >
          <RequestTypesToggles
            selected={selectedType}
            setSelected={setSelectedType}
            counts={counts}
            orderType={orderType}
            dispatch={dispatch}
            orderTypeId={filters.typeOrder || 0}
          />
          <Tabs
            aria-label="basic tabs example"
            value={currentTab}
            onChange={(e, v) => {
              setCurrentTab(v);
              dispatch({
                type: "SET_ORDER_BY_CLIENT",
                payload: v,
              });
            }}
          >
            <Tab label="الكل" value={""} />
            <Tab label="فرد" value={"individual"} />
            <Tab label="شركة" value={"company"} />
          </Tabs>
        </Box>
        <Paper sx={{ overflow: "hidden" }} elevation={0}>
          {filtered && (
            <ClientTableComponent
              openModel={handleOpenModel}
              openStatus={handleOpenStatus}
              openDetails={handleOpenDetails}
              tableRef={tableRef}
              requests={filtered}
              dispatch={dispatch}
              limit={filters.limit}
              openFinance={handleOpenFinance}
              openReport={handleOpenReport}
              openAccept={handleOpenAccept}
              openTest={handleOpenTest}
              openVisit={handleOpenVisit}
            />
          )}

          {requests === "loading" && <LoadingTable rows={8} cols={7} />}

          {requests === "error" && (
            <Typography
              variant="h4"
              color="error"
              textAlign="center"
              fontWeight={700}
              p={1}
              py={4}
            >
              حدث خطأ في عرض الطلبات.
              <br />
              <br />
              برجاء اعادة المحاولة مرة اخري
            </Typography>
          )}
        </Paper>
      </Stack>
    </>
  );
};

export default ClientRequests;
