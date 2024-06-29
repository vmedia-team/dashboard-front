import { Grid, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import React from "react";
import AddLabelToEl from "../../../../../components/AddLabelToEl";

function ContructData() {
  return (
    <Paper>
      <Stack>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <AddLabelToEl label={"نوع الفرع"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
          <Grid item xs={6}>
            <AddLabelToEl label={"الادارة"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
          <Grid item xs={6}>
            <AddLabelToEl label={"رقم العقد"} required>
              <TextField size="small" />
            </AddLabelToEl>
          </Grid>
          <Grid item xs={6}>
            <AddLabelToEl label={"الجهة الحكومية"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
          <Grid item xs={6}>
            <AddLabelToEl label={"تاريخ بداية العقد"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
          <Grid item xs={6}>
            <AddLabelToEl label={"تاريخ انتهاء العقد"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
          <Grid item xs={6}>
            <AddLabelToEl label={"القيمة المالية"} required>
              <TextField size="small" />
            </AddLabelToEl>
          </Grid>
          <Grid item xs={6}>
            <AddLabelToEl label={"مدير العقد"} required>
              <Select size={"small"}>
                <MenuItem value={1}>test</MenuItem>
              </Select>
            </AddLabelToEl>
          </Grid>
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
