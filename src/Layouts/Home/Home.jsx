import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PetsIcon from "@mui/icons-material/Pets";
import SavingsIcon from "@mui/icons-material/Savings";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Reto from "../Lanzamientos";
import Mascotas from "../Mascotas/Mascotas";
import Presupuesto from "../Presupuesto/Presupuesto";
import "./styles.scss";

const drawerWidth = 240;

function Home(props) {
  const navigate = useNavigate();
  const { children, vista } = props;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [vistaUser, setVistaUser] = useState('reto');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleVista = (cualVista) => {
    // setVistaUser(cualVista);
    navigate(`/${cualVista}/`);
    handleDrawerToggle();
  };

  const drawer = (
    <div>
      <Toolbar>
        <h4>Menu</h4>
      </Toolbar>
      <Divider />
      <List>
        <ListItem
          key="0"
          disablePadding
          onClick={() => {
            handleVista('lanzamientos');
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <RocketLaunchIcon className={vista === 0 && "selected-icon"} />
            </ListItemIcon>
            <ListItemText primary="Lanzamientos" className={vista === 0 && "selected-icon"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="1"
          disablePadding
          onClick={() => {
            handleVista('mascotas');
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <PetsIcon className={vista === 1 && "selected-icon"} />
            </ListItemIcon>
            <ListItemText primary="Croquetas" className={vista === 1 && "selected-icon"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="2"
          disablePadding
          onClick={() => {
            handleVista('presupuesto');
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <SavingsIcon className={vista === 2 && "selected-icon"} />
            </ListItemIcon>
            <ListItemText primary="Presupuesto" className={vista === 2 && "selected-icon"} />
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Divider />
      <List>
          <ListItem key='b1' disablePadding>
            <ListItemButton>
              <ListItemIcon><PetsIcon /></ListItemIcon>
              <ListItemText primary='Lista 2' />
            </ListItemButton>
          </ListItem>
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="toolbar">
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Starbucks Fans Hub
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Home;
