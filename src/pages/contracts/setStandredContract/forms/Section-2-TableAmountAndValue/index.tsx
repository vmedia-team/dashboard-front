import { Box, Button, Table, TableContainer } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import TableHeaders from "./components/TableHeader";
import TableBodyData from "./components/TableBodyData";
import SetDialog from "./components/Dialog";

export default function AmountAndValueOfTable() {
  // TODO::declare and define component state and variables...
  const [openDialog, setOpenDialog] = useState(false);

  // TODO::declare and define component helper methods...
  // * return component ui..
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={() => setOpenDialog(!openDialog)}
        >
          اضافة بند
        </Button>
      </Box>
      {/* data table */}
      <TableContainer>
        <Table>
          <TableHeaders />
          <TableBodyData />
        </Table>
      </TableContainer>
      {/* Create/Edit Dialog */}
      <SetDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
