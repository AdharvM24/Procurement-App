import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ItemMaster from "../components/ItemMasterr";
import PurchaseOrder from "../components/PurchaseOrder";
import MenuBar from "../components/menuBar/MenuBar";
import ItemMasterTable from "../components/utilities/ItemMasterTable";

const Home = () => <ItemMaster />;
const Purchase = () => <PurchaseOrder />;

const MainRoute = () => {
  const [open, setOpen] = useState(true);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#000000",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ color: "#ffff" }}>
              Procurement App
            </Typography>
          </Toolbar>
        </AppBar>

        <MenuBar open={open} handleDrawerToggle={handleDrawerToggle} />

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "#ffff", p: 6, marginTop: "64px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/purchase_order" element={<Purchase />} />
            <Route path="/itemtable" element={<ItemMasterTable />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default MainRoute;
