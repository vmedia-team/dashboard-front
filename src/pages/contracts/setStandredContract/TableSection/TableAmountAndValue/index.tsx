import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SetDialog from "./SetDialog";
import { useState } from "react";

function TableAmountAndValue() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={() => setOpen(!open)}
        >
          اضافة بند
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>كود البند</TableCell>
              <TableCell>وصف قصير للبند</TableCell>
              <TableCell>وصف طويل للبند</TableCell>
              <TableCell>نموذج العمل</TableCell>
              <TableCell>وحدة</TableCell>
              <TableCell>السعر</TableCell>
              <TableCell>القيمة</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableBody>
        </Table>
      </TableContainer>
      <SetDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default TableAmountAndValue;
