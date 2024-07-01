import { Grid, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function ContructData() {
  // TODO::declare and define component state and variables
  const { register, control, handleSubmit, reset } = useForm();
  // TODO::declare and define component helper methods
  // * return component UI
  return (
    <Paper>
      <Stack>
        <Grid container spacing={2}>
          {/* Branch Field */}
          <Grid item xs={6}>
            <AddLabelToEl label={"نوع الفرع"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
          {/* management Field */}
          <Grid item xs={6}>
            <AddLabelToEl label={"الادارة"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
          {/* contract number */}
          <Grid item xs={6}>
            <AddLabelToEl label={"رقم العقد"} required>
              <TextField size="small" />
            </AddLabelToEl>
          </Grid>
          {/* Governmental entity */}
          <Grid item xs={6}>
            <AddLabelToEl label={"الجهة الحكومية"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
          {/* Start Data */}
          <Grid item xs={6}>
            <AddLabelToEl label={"تاريخ بداية العقد"} required>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                    onChange={(newValue) => {
                      field.onChange(
                        newValue ? newValue.format("YYYY-MM-DD") : ""
                      );
                    }}
                  />
                )}
              />
            </AddLabelToEl>
          </Grid>
          {/* End Data */}
          <Grid item xs={6}>
            <AddLabelToEl label={"تاريخ انتهاء العقد"} required>
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                    onChange={(newValue) => {
                      field.onChange(
                        newValue ? newValue.format("YYYY-MM-DD") : ""
                      );
                    }}
                  />
                )}
              />
            </AddLabelToEl>
          </Grid>
          {/* Financial Value */}
          <Grid item xs={6}>
            <AddLabelToEl label={"القيمة المالية"} required>
              <TextField size="small" />
            </AddLabelToEl>
          </Grid>
          {/* Contract Manager */}
          <Grid item xs={6}>
            <AddLabelToEl label={"مدير العقد"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
          {/* Contract Name */}
          <Grid item xs={6}>
            <AddLabelToEl label={"اسم العقد"} required>
              <TextField size="small" />
            </AddLabelToEl>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}

export default ContructData;
