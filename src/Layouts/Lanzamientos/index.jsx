import React from "react";
import {Box, Container, Grid} from "@mui/material";
import Home from "../Home/Home";
import { getWeekNumber } from "../../Utils/helpers";
import "./styles.scss";

export default function Lanzamientos() {
  return (
    <Home vista={0}>
      <Box id="lanzamientos" sx={{ flexGrow: 1 }}>
        <h1>Calendario de Lanzamientos</h1>
        
      </Box>
    </Home>
  );
}
