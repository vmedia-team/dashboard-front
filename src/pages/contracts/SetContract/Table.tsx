import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  Stack,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import TableHeader from "./topTable/TableHeader";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../Context/Store";
import { ContractsContext } from "../Context/ContractsContext";
import { NavLink } from "react-router-dom";
function ContractsTable({ value }: PropsType) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const tableContext = useContext(ContractContext);
  const chekedArray: number[] = selectedItems;
  const { contracts } = useContext(ContractsContext);
  useEffect(() => {
    tableContext?.setIndex(chekedArray);
  }, [selectedItems]);

  function CheckboxHandler(e: any) {
    let isSelect = e.target.checked;
    let value = parseInt(e.target.value);
    if (isSelect) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }
  return (
    <Stack>
      <TableContainer sx={{ height: 500 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHeader value={value} />
          <TableBody>
            {contracts?.map((request) => {
              return (
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(request.id)}
                      value={request.id}
                      onChange={CheckboxHandler}
                    />
                  </TableCell>
                  <TableCell>{request.code}</TableCell>
                  <TableCell>{request.type.name}</TableCell>
                  <TableCell>{request.client?.name}</TableCell>
                  <TableCell>{request.branch.name}</TableCell>
                  <TableCell>{request.client?.phone}</TableCell>
                  <TableCell>{request.period}</TableCell>
                  <TableCell>{request.end_date_period}</TableCell>
                  <TableCell>{request.employee?.name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                      component={NavLink}
                      to={`${request.id}/edit`}
                      size="small"
                    >
                      <SettingsIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

type PropsType = {
  value: number;
};

export default ContractsTable;
