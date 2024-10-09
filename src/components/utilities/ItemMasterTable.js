import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ItemMasterTable() {
  const dataItems = useSelector((state) => state.items?.items);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item No</StyledTableCell>
            <StyledTableCell align="right">Item Name</StyledTableCell>
            <StyledTableCell align="right">Inventory Location</StyledTableCell>
            <StyledTableCell align="right">Brand</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Supplier</StyledTableCell>
            <StyledTableCell align="right">Stock Unit</StyledTableCell>
            <StyledTableCell align="right">Unit Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataItems?.flat().map((row) => (
            <StyledTableRow key={row.itemNo}>
              <StyledTableCell component="th" scope="row">
                {row.itemNo}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.itemName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.inventoryLocation}
              </StyledTableCell>
              <StyledTableCell align="right">{row.brand}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.supplier}</StyledTableCell>
              <StyledTableCell align="right">{row.stockUnit}</StyledTableCell>
              <StyledTableCell align="right">{row.unitPrice}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
