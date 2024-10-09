import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const MenuBar = ({ open, handleDrawerToggle }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const drawerWidth = open ? 240 : 60;

  const menuItems = [
    { text: "ITEM MASTER", icon: <PostAddIcon />, path: "/" },
    { text: "Purchase Order", icon: <StoreIcon />, path: "/purchase_order" },
  ];

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: "#000000",
        color: "#00bcd4",
        height: "100%",
        transition: "width 0.3s",
        marginTop: "22px",
      }}
    >
      <Box sx={{ padding: "16px" }}>
        {open && <Typography variant="h5" color="#ffff"></Typography>}
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
            {open && (
              <ListItemText primary={item.text} sx={{ color: "#ffff" }} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : undefined}
      onClose={isMobile ? handleDrawerToggle : undefined}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#212121",
          color: "#00bcd4",
          transition: "width 0.3s",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default MenuBar;
