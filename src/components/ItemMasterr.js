import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Switch,
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Search, CloudUpload } from "@mui/icons-material";
import "./ItemMaster.css";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/action";
import Tooltip from "@mui/material/Tooltip";

const ItemMaster = () => {
  //states codes.......................................................................................................................................
  const [itemName, setItemName] = useState("");
  const [inventoryLocation, setInventoryLocation] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [stockUnit, setStockUnit] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [status, setStatus] = useState(true); // Default to enabled
  const [images, setImages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemNo, setItemNo] = useState("");
  const [itemNameError, setItemNameError] = useState("");
  const [inventoryLocationError, setInventoryLocationError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  //.......................................................................................................................................................
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const supplierList = ["Supplier 1", "Supplier 2", "Supplier 3"];
  //ItemId Generator.............................................................................................................................................
  function generateItemId() {
    const randomFourDigits = Math.floor(1000 + Math.random() * 9000);
    const itemId = `ITEM${randomFourDigits}`;
    return itemId;
  }
  useEffect(() => {
    const newItemId = generateItemId();
    setItemNo(newItemId);
  }, []);
  //validations...........................................................................................................................................
  const validateItemName = () => {
    const re = /^[A-Za-z0-9\s]{1,30}$/;
    if (!re.test(itemName)) {
      setItemNameError("please enter a valid item name");
    } else {
      setItemNameError("");
    }
  };
  const validateInventoryLocation = () => {
    const re = /^[A-Za-z0-9\s]{1,30}$/;
    if (!re.test(inventoryLocation)) {
      setInventoryLocationError("please enter a valid location");
    } else {
      setInventoryLocationError("");
    }
  };
  const validateBrand = () => {
    const re = /^[A-Za-z0-9\s]{1,30}$/;
    if (!re.test(brand)) {
      setBrandError("please enter a valid brand");
    } else {
      setBrandError("");
    }
  };
  const validateCategory = () => {
    const re = /^[A-Za-z0-9\s]{1,30}$/;
    if (!re.test(category)) {
      setCategoryError("please enter a valid category");
    } else {
      setCategoryError("");
    }
  };
  //................................................................................................................................................................
  const handleItemNameChange = (e) => {
    let name = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    name = name.slice(0, 20);
    setItemName(name);
  };
  const handleInventoryLocationChange = (e) => {
    let location = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    location = location.slice(0, 30);
    setInventoryLocation(location);
  };
  const handleBrandChangeChange = (e) => {
    let brand = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    brand = brand.slice(0, 40);
    setBrand(brand);
  };
  const handleCategoryChange = (e) => {
    let categorys = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    categorys = categorys.slice(0, 40);
    setCategory(categorys);
  };
  const handlePriceChange = (e) => {
    let price = e.target.value.replace(/[^\d.]/g, "");
    price = price.slice(0, 6);
    setUnitPrice(price);
  };
  //image handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };
  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = [
      // ...items,
      {
        itemNo: itemNo,
        itemName: itemName,
        inventoryLocation: inventoryLocation,
        brand: brand,
        category: category,
        supplier: supplier,
        stockUnit: stockUnit,
        unitPrice: unitPrice,
      },
    ];
    dispatch(addItem(data));
    setItemName("");
    setInventoryLocation("");
    setBrand("");
    setCategory("");
    setSupplier("");
    setStockUnit("");
    setUnitPrice("");
    const newItemId = generateItemId();
    setItemNo(newItemId);
  };
  //navigation to item table
  const handleTable = () => {
    navigate("/itemtable");
  };
  //dialog open && close function
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleSupplierSelect = (supplierName) => {
    setSupplier(supplierName);
    handleDialogClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <button className="tableButton" onClick={handleTable}>
          {" "}
          <span>Item List</span>
        </button>
      </Box>
      <Typography variant="h5" gutterBottom>
        ITEM MASTER
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Item No*/}
          <Grid item xs={12}>
            <TextField label="Item No" value={itemNo} disabled fullWidth />
          </Grid>

          {/* Item Name */}
          <Grid item xs={12}>
            <TextField
              label="Item Name"
              value={itemName}
              onChange={handleItemNameChange}
              fullWidth
              required
              onBlur={validateItemName}
              helperText={itemNameError}
              error={Boolean(itemNameError)}
            />
          </Grid>

          {/* Inventory Location */}
          <Grid item xs={12}>
            <TextField
              label="Inventory Location"
              value={inventoryLocation}
              onChange={handleInventoryLocationChange}
              fullWidth
              required
              onBlur={validateInventoryLocation}
              helperText={inventoryLocationError}
              error={Boolean(inventoryLocationError)}
            />
          </Grid>

          {/* Brand */}
          <Grid item xs={12}>
            <TextField
              label="Brand"
              value={brand}
              onChange={handleBrandChangeChange}
              fullWidth
              required
              onBlur={validateBrand}
              helperText={brandError}
              error={Boolean(brandError)}
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12}>
            <TextField
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              fullWidth
              required
              onBlur={validateCategory}
              helperText={categoryError}
              error={Boolean(categoryError)}
            />
          </Grid>

          {/* Supplier */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Supplier"
                value={supplier}
                onClick={handleDialogOpen}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleDialogOpen}>
                      <Search />
                    </IconButton>
                  ),
                }}
              />
            </FormControl>

            {/* Supplier Dialog */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogTitle>Select a Supplier</DialogTitle>
              <DialogContent>
                <List>
                  {supplierList.map((sup) => (
                    <ListItem
                      button
                      key={sup}
                      onClick={() => handleSupplierSelect(sup)}
                    >
                      <ListItemText primary={sup} />
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} sx={{ color: "black" }}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>

          {/* Stock Unit */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="stock-unit-label">Stock Unit</InputLabel>
              <Select
                labelId="stock-unit-label"
                value={stockUnit}
                label="Stock Unit"
                onChange={(e) => setStockUnit(e.target.value)}
              >
                <MenuItem value="kg">Kg</MenuItem>
                <MenuItem value="liters">Liters</MenuItem>
                <MenuItem value="pieces">Pieces</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Unit Price */}
          <Grid item xs={12}>
            <TextField
              label="Unit Price"
              value={unitPrice}
              onChange={handlePriceChange}
              fullWidth
              required
            />
          </Grid>

          {/* Item Images */}
          <Grid item xs={12}>
            <Tooltip title="Image must be in JPG, PNG, or JPEG format" arrow>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
                sx={{ backgroundColor: "black", color: "white" }}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleImageUpload}
                />
              </Button>
            </Tooltip>
            {images.length > 0 && (
              <Typography variant="body2">
                {images.length} image(s) uploaded
              </Typography>
            )}
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <Typography>Status</Typography>
            <Switch
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "black",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "black",
                },
              }}
            />

            <Typography variant="body2">
              {status ? "Enabled" : "Disabled"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "black", color: "white" }}
              fullWidth
              onClick={handleSubmit}
              disabled={
                itemNameError ||
                categoryError ||
                brandError ||
                inventoryLocationError
              }
            >
              Save Item
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ItemMaster;
