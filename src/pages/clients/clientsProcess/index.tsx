import { Stack, Typography } from "@mui/material";
import TabsAndAdd from "./TabsAndAdd";
import { useContext, useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { Api } from "../../../constants";
import { StepType } from "./types/Step";
import LevelItem from "./levelItems/LevelItem";
import { FormData } from "./types/FormData";
import { OrderType } from "./types/OrderType";
import LevelsPlaceholder from "../../../components/PlaceHolder/LevelsPlaceholder";
import { useSnackbar } from "notistack";
import { MainBreadCrumbContext } from "../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

const InitLevel: StepType = {
  branch_id: 0,
  department_id: null,
  period: 0,
  form_id: 0,
  employee_id: 0,
  accept: 0,
  approval: 0,
  type_id: 0,
};

const ClientProcess = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [typeOrder, setTypeOrder] = useState<OrderType[]>();
  const [typeOrderId, setTypeOrderId] = useState<number>(1);
  const [endPointStatus, setEndPointStatus] =
    useState<EndPointStateType>("none");
  const [sendState, setSendState] = useState<SendStateType>("none");
  const [dataForm, setDataForm] = useState<FormData | null>();
  const [process, setProcess] = useState<ProcedureType>({
    levels: [InitLevel],
  });
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );
  const { enqueueSnackbar } = useSnackbar();

  const getFormData = () => {
    return new Promise<void>((resolve, reject) => {
      if (!dataForm) {
        axios
          .get<FormData>(Api("employee/client/order/steps/use"))
          .then((res) => {
            // setEndPointStatus("none");
            setTypeOrder(res.data.typeOrder);
            setDataForm(res.data);
            resolve();
          })
          .catch((err) => {
            setEndPointStatus("error");
            reject(err);
          });
      } else resolve();
    });
  };

  const getLevels = () => {
    return new Promise<void>((resolve, reject) => {
      axios
        .get(Api(`employee/client/order/steps/${typeOrderId}`))
        .then((res) => {
          setEndPointStatus("none");
          setLevels(res.data.data);
          resolve();
        })
        .catch((err) => {
          setEndPointStatus("error");
          reject(err);
        });
    });
  };

  const submitData = () => {
    const data = process.levels?.map(
      ({
        department_id,
        period,
        form_id,
        employee_id,
        accept,
        approval,
        type_id,
      }): Partial<StepType> => {
        return {
          department_id,
          period,
          form_id,
          employee_id,
          accept,
          approval,
          type_id: typeOrderId,
        };
      }
    );
    setSendState("sending");
    axios
      .post(Api(`employee/client/order/steps/store/${typeOrderId}`), data)
      .then((res) => {
        enqueueSnackbar("تم حفظ الاجراءات بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر في حفظ الاراءات", { variant: "error" });
      })
      .finally(() => {
        setSendState("none");
      });
  };

  const loadLevels = () => {
    handleClearLinks();
    handleAddNewTerm({
      title: "العملاء",
      path: "/",
      disabled: true,
    });
    handleAddNewTerm({
      title: "اجراءات العملاء",
      path: "/",
    });
    setEndPointStatus("loading");
    getFormData().then(getLevels).catch();
  };

  const updateLevel = (index: number) => {
    return (payload: StepType) => {
      const instance = [...process.levels];
      instance.splice(index, 1, payload);
      setLevels(instance);
    };
  };

  const setLevels = (payload: StepType[]) => {
    setProcess({ ...process, levels: payload });
  };

  function addLevel() {
    const instance = [...process.levels];
    instance.push(InitLevel);
    setLevels(instance);
  }

  function removeLevel(val: number) {
    const instance = [...process.levels];

    instance.splice(val, 1);
    setLevels(instance);
  }

  useEffect(loadLevels, [currentTab, typeOrderId]);

  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} mb={3}>
        اعدادات اجراءات العملاء
      </Typography>

      <TabsAndAdd
        addLevel={addLevel}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        disabled={endPointStatus !== "none"}
        orderType={typeOrder || []}
        setOrderTypeId={setTypeOrderId}
      />

      <Paper sx={{ p: 2 }}>
        {endPointStatus === "loading" && (
          <Stack>
            <LevelsPlaceholder />
          </Stack>
        )}

        {endPointStatus === "error" && (
          <Stack>
            <Typography variant="h5" py={4} color="error" textAlign="center">
              حدث خطأ في تحميل المراحل, برجاء المحاولة مرة اخري
            </Typography>
          </Stack>
        )}

        {dataForm && (
          <Stack>
            {endPointStatus === "none" &&
              process.levels?.map((level, index, arr) => {
                const IS_LAST_ITEM = index === arr.length - 1;
                return (
                  <LevelItem
                    key={level.id}
                    level={level}
                    updateLevel={updateLevel(index)}
                    nameBtn={`المرحلة ${index + 1}`}
                    dataForm={dataForm}
                    onDelete={
                      IS_LAST_ITEM
                        ? () => {
                            removeLevel(index);
                          }
                        : undefined
                    }
                  />
                );
              })}
          </Stack>
        )}

        {process?.levels?.length === 0 && endPointStatus === "none" && (
          <Typography variant="h5" textAlign="center" p={2} py={4}>
            لم يتم ايجاد اي من المراحل المطلوبة
          </Typography>
        )}

        <Stack mt={2} direction={"row-reverse"}>
          <LoadingButton
            sx={{ px: 4 }}
            variant="contained"
            loading={sendState === "sending"}
            disabled={endPointStatus !== "none"}
            onClick={submitData}
          >
            حفظ
          </LoadingButton>
        </Stack>
      </Paper>
    </Stack>
  );
};

type EndPointStateType = "none" | "loading" | "error";
type SendStateType = "none" | "sending";

export interface ProcedureType {
  levels: StepType[];
}

export interface LevelType {
  departmentManagerId: number;
  employeeId: number;
  accepted: boolean;
  approval: boolean;
  duration: string;
  model: number;
}

export default ClientProcess;
