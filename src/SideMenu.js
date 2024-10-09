import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import ItemMaster from "./components/ItemMasterr";
import ItemMasterTable from "./components/utilities/ItemMasterTable";
// Home Page Component
const Home = () => <ItemMaster />;
// Cats Page Component
const Cats = () => (
  <Typography variant="h4" color="#00bcd4">
    Cats Page
  </Typography>
);
// Dogs Page Component
const Dogs = () => (
  <Typography variant="h4" color="#00bcd4">
    Dogs Page
  </Typography>
);

const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const drawerWidth = 240;

  const menuItems = [
    { text: "ITEM MASTER", icon: <HomeIcon />, path: "/" },
    // { text: "CATS", icon: <PetsIcon />, path: "/cats" },
    // { text: "DOGS", icon: <DescriptionIcon />, path: "/dogs" },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: "#000000",
        color: "#00bcd4",
        height: "100%",
      }}
    >
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h5" color="#ffff">
          HOME PAGE
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon sx={{ color: "#ffff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: "#ffff" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "#ffff" }}
            >
              Procurement App
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Drawer for non-mobile (permanent) */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#212121",
                color: "#00bcd4",
              },
            }}
          >
            {drawer}
          </Drawer>
        )}

        {/* Drawer for mobile (temporary) */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#212121",
                color: "#00bcd4",
              },
            }}
          >
            {drawer}
          </Drawer>
        )}

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "#ffff", p: 6, marginTop: "64px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cats" element={<Cats />} />
            <Route path="/dogs" element={<Dogs />} />
            <Route path="/itemmaster_table" element={<ItemMasterTable />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default SideMenu;
