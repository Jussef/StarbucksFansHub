import React from "react";
import {Box, Container, Grid} from "@mui/material";
import Home from "../Home/Home";
import { getWeekNumber } from "../../Utils/helpers";
import "./styles.scss";

export default function Beneficios() {
  return (
    <Home vista={1}>
      <Box id="beneficios" sx={{ flexGrow: 1 }}>
        <h1>Todos los Beneficios Rewards</h1>
        
      </Box>
    </Home>
  );
}
