import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Home from "../Home/Home";
import { getWeekNumber, getWeekDays, getDataWeekNumber } from "../../Utils/helpers";

export default function Lanzamientos() {
  const weekDays = getWeekDays();
  const weekNumber = getWeekNumber();
  const dataWeekNumber = getDataWeekNumber();

  return (
    <Home vista={0}>
      <Box sx={{ flexGrow: 1 }}>
        <h3>Reto de ahorro 52 semanas</h3>
        <Typography variant="h2">{`Estamos en la semana: ${weekNumber}`}</Typography>
        <Typography paragraph>{`Empieza el lunes ${weekDays[0]} y termina el domingo ${weekDays[1]}`}</Typography>
        <br />
        <br />
        <Box textAlign="center" sx={{ width: "100%" }}>
          <Grid container spacing={5} direction="row" justifyContent="space-evenly" alignItems="center">
            <Grid item xs={4}>
              <Paper className="paper1">
                <Box textAlign="center">
                  <Typography paragraph>{`Deposito`}</Typography>
                  <h4>${dataWeekNumber[0]}</h4>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className="paper2">
                <Box textAlign="center">
                  <Typography paragraph>{`Balance`}</Typography>
                  <h4>${dataWeekNumber[1]}</h4>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className="paper3">
                <Box textAlign="center">
                  <Typography paragraph>{`Pago quincenal`}</Typography>
                  <h4> {dataWeekNumber[2] == undefined ? "No es quincena!" : `$${dataWeekNumber[2]}`}</h4>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Home>
  );
}
