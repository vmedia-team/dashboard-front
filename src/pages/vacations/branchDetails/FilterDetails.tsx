import { Button, Grid, MenuItem, TextField } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import AddDialog from "../AddDialog";
import ErrorDialog from "../ErrorDialog";
import { useParams } from "react-router-dom";

function FilterDetails(props: PropsType) {
  const [yearFilter, setYearFilter] = useState();
  const [statusFilter, setStatusFilter] = useState<{
    name: string;
    value: Number;
  }>({
    name: "string",
    value: 0,
  });

  const { branchId } = useParams();
  const [dialogState, setDialogState] = useState<DialogState>("none");
  const closeDialog = () => {
    setDialogState("none");
  };
  const openErrorDialog = () => {
    setDialogState("error");
  };
  const openAddDialog = () => {
    setDialogState("add");
  };
  const openDetailsDialog = () => {
    setDialogState("details");
  };

  return (
    <Grid container width={1} py={2}>
      <Grid container spacing={2} md={10}>
        <Grid item xs={2}>
          <DatePicker
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={'"العام"'}
            openTo="year"
            disableFuture
            views={["year"]}
            value={yearFilter}
            // onChange={(e) => {
            //   setYearFilter(e.target.value);
            // }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            select
            fullWidth
            label="الحالة"
            size="small"
            sx={{ color: "primary" }}
            value={statusFilter.value}
            onChange={(e) => {
              setStatusFilter({
                ...statusFilter,
                value: parseInt(e.target.value),
              });
            }}
          >
            <MenuItem value={10}>معتمد</MenuItem>
            <MenuItem value={20}>مسودة</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid item md={2}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          onClick={() => {
            openAddDialog();
          }}
        >
          <AddCircleOutlineRoundedIcon sx={{ mr: 1 }} />
          إضافة محدد
        </Button>
      </Grid>
      {branchId && (
        <AddDialog
          setData={props.setTableData}
          open={dialogState === "add"}
          branch_id={branchId}
          onClose={closeDialog}
          openErrorDialog={openErrorDialog}
          openAddDialog={openAddDialog}
        />
      )}
      <ErrorDialog
        open={dialogState === "error"}
        onClose={openAddDialog}
        massage={"error message"}
      />
    </Grid>
  );
}

export type DialogState = "none" | "error" | "add" | "details";

export default FilterDetails;

type PropsType = {
  setTableData: () => void;
};