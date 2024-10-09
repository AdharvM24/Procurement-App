import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";



const suppliers = ["Supplier 1", "Supplier 2", "Supplier 3"];
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

const PurchaseOrder = () => {
  const items = useSelector((state) => state.items?.items);
  console.log("items", items);
  const [orderNo, setOrderNo] = useState("");
  const orderDate = new Date().toISOString().slice(0, 10);
  const [supplier, setSupplier] = useState("");
  const [itemList, setItemList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSearch, setItemSearch] = useState("");

  //generate new orderid
  useEffect(() => {
    const newOrderId = generateOrderId();
    setOrderNo(newOrderId);
  }, []);

  const handleAddItem = (item) => {
    setItemList([
      ...itemList,
      { ...item, orderQty: 1, netAmount: item.unitPrice },
    ]);
    setIsModalOpen(false);
  };
  //random id generator function
  function generateOrderId() {
    const randomFourDigits = Math.floor(10000 + Math.random() * 90000);
    const itemId = `ORDER${randomFourDigits}`;
    return itemId;
  }

  const handleQtyChange = (index, qty) => {
    const updatedItems = [...itemList];
    updatedItems[index].orderQty = qty;
    updatedItems[index].netAmount = qty * updatedItems[index].unitPrice;
    setItemList(updatedItems);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(itemList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Order");
    XLSX.writeFile(workbook, "PurchaseOrder.xlsx");
  };

  const handlePrint = () => {
    const printContents =
      document.getElementById("printable-section").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField label="Order No" value={orderNo} disabled fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Order Date"
          type="date"
          value={orderDate}
          disabled
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Supplier Name"
          select
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setIsModalOpen(true)}>
                <Search />
              </IconButton>
            ),
          }}
        >
          {suppliers.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="outlined"
          onClick={() => setIsModalOpen(true)}
          sx={{ backgroundColor: "black", color: "white" }}
        >
          Add Items
        </Button>
        {/*table */}
        <TableContainer
          component={Paper}
          sx={{ marginTop: 2 }}
          id="printable-section"
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Item No</StyledTableCell>
                <StyledTableCell>Item Name</StyledTableCell>
                <StyledTableCell align="right">Stock Unit</StyledTableCell>
                <StyledTableCell align="right">Unit Price</StyledTableCell>
                <StyledTableCell align="right">Packing Unit</StyledTableCell>
                <StyledTableCell align="right">Order Qty</StyledTableCell>
                <StyledTableCell align="right">Net Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemList.map((item, index) => (
                <StyledTableRow key={item.itemNo}>
                  <StyledTableCell>{item.itemNo}</StyledTableCell>
                  <StyledTableCell>{item.itemName}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.stockUnit}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.unitPrice}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      select
                      value={item.packingUnit || ""}
                      onChange={(e) => {
                        const updatedItems = [...itemList];
                        updatedItems[index].packingUnit = e.target.value;
                        setItemList(updatedItems);
                      }}
                    >
                      <MenuItem value="box">Box</MenuItem>
                      <MenuItem value="pcs">Pieces</MenuItem>
                    </TextField>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      type="number"
                      value={item.orderQty}
                      onChange={(e) =>
                        handleQtyChange(index, Number(e.target.value))
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.netAmount}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Export and Print */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleExportToExcel}
          sx={{ backgroundColor: "black", color: "white", mr: 2 }}
        >
          Export to Excel
        </Button>
        <Button
          variant="contained"
          onClick={handlePrint}
          sx={{ backgroundColor: "black", color: "white" }}
        >
          Print
        </Button>
      </Grid>

      {/* Item Selection Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Select Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Search with Item name"
            value={itemSearch}
            sx={{ mt: 2 }}
            onChange={(e) => setItemSearch(e.target.value)}
            fullWidth
          />
          <Table>
            <TableBody>
              {items
                ?.flat()
                .filter((item) =>
                  item?.itemName
                    ?.toLowerCase()
                    .includes(itemSearch?.toLowerCase())
                )
                .map((item) => (
                  <TableRow
                    key={item.itemNo}
                    onClick={() => handleAddItem(item)}
                  >
                    <TableCell>{item.itemNo}</TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.stockUnit}</TableCell>
                    <TableCell>{item.unitPrice}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{ backgroundColor: "black", color: "white" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PurchaseOrder;
