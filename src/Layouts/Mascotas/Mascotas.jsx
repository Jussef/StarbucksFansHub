import React, { useEffect, useState, useRef } from "react";
import { Button, Box, Grid, Select, MenuItem, FormControl, InputLabel, Paper, IconButton } from "@mui/material";
import Home from "../Home/Home";
import dayjs from "dayjs";
import "dayjs/locale/es";
import uniqid from "uniqid";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import cat from "../../img/cat.json";
import Pata from "../../Components/Lotties/Pata";
import PataRef from "../../Components/Lotties/PataRef";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { esES } from "@mui/x-date-pickers/locales";
import { updateData, getCollectionsComplete } from "../../Utils/helpers";
import Tabla from "../../Components/Tabla/Tabla";
import "./styles.scss";

export default function Mascotas() {
  const [entradas, setEntradas] = useState([]);
  const [dia, setDia] = useState(dayjs().format("DD-MM-YYYY"));
  const [kilos, setKilos] = useState(1);
  const [ultimaFecha, setUltimaFecha] = useState("");
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    getEntradas();
    calcularDiasTranscurridos(dia, ultimaFecha);
  }, []);

  const getEntradas = async () => {
    const data = await getCollectionsComplete(`mascotas/croquetas`);
    let lastDate = ""; // Variable para almacenar la última fecha encontrada

    Object.keys(data).forEach((key) => {
      const info = data[key];
      const { fecha } = info;
      const fechaObj = dayjs(fecha, "DD-MM-YYYY"); // Convertir la cadena de fecha en un objeto dayjs

      if (!lastDate || fechaObj.isAfter(lastDate)) {
        lastDate = fechaObj; // Actualizar lastDate si encontramos una fecha más reciente
      }
    });

    // Formatear la última fecha encontrada en el formato deseado (DD-MM-YYYY)
    setUltimaFecha(lastDate.format("DD-MM-YYYY"));
    setEntradas(data);
  };

  const calcularDiasTranscurridos = (diaselecc, ultimaFecha) => {
    if (ultimaFecha === "") {
      return 0; // Si no hay última fecha, los días transcurridos son 0
    }
    const formattedDiaSeleccionado = dayjs(diaselecc, "DD-MM-YYYY").format("YYYY-MM-DD");
    const formattedUltimaFecha = dayjs(ultimaFecha, "DD-MM-YYYY").format("YYYY-MM-DD");
    const diffInMilliseconds = dayjs(formattedDiaSeleccionado).diff(dayjs(formattedUltimaFecha));
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return days;
  };

  const handleDateChange = (date) => {
    const timestamp = dayjs(date).startOf("day").format("DD-MM-YYYY");
    setDia(timestamp);
  };

  const handleKilosChange = (event) => {
    setKilos(event.target.value);
  };

  // funcion que llama tabla componente hijo
  const handleEliminarFila = async (ID) => {
    console.log(ID);
    getEntradas();
  };

  // funcion que llama tabla componente hijo
  const handleCompleteAnimar = async (complete) => {
    console.log("%c :::", "font-size: 100%; color: #bc57ff; font-weight: 700;");
    console.log(animar);
    setAnimar(false);
    guardar();
  };

  const animaPata = () => {
    setAnimar(true);
  };

  const guardar = async () => {
    const id = uniqid();
    const json = {
      fecha: dia,
      kilos: kilos,
      diasTranscurridos: calcularDiasTranscurridos(dia, ultimaFecha),
    };
    console.log("%c :::", "font-size: 100%; color: #00ff22; font-weight: 700;");
    console.log(id);
    console.log(json);
    console.log("ultimaFecha", ultimaFecha);

    Swal.fire({
      title: "¿Guardar?",
      text: "¿Quieres guardar " + dia + "?",
      icon: "warning",
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#2D6DB4",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateData(`mascotas/croquetas`, id, json)
          .then(() => {
            Swal.fire({
              title: "¡Listo!",
              text: "Día guardado",
              icon: "success",
              confirmButtonText: "Confirmar",
              confirmButtonColor: "#2D6DB4",
            }).then((result) => {
              if (result.isConfirmed) {
                getEntradas();
              }
            });
          })
          .catch((e) => console.log(e));
      }
    });
  };

  const styleCat = {
    height: 120,
  };

  return (
    <Home vista={1}>
      <Box>
        <h3>Croquetas</h3>
        <Lottie animationData={cat} style={styleCat} />
        <Box textAlign="center">
          <Paper elevation={3} className="paperCroquetas">
            <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Grid md={4} xs={12} sx={{ mb: 2 }}>
                <Box textAlign="center">
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es" localeText={esES}>
                    <DatePicker label="Día" defaultValue={dayjs()} onChange={handleDateChange} />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid md={4} xs={12} sx={{ mb: 2 }}>
                <Box textAlign="center">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">Kg</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={kilos} label={kilos} onChange={handleKilosChange}>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid md={4} xs={12} sx={{ mb: 2 }}>
                <Box textAlign="center">
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => {
                      animaPata();
                    }}
                  >
                    <PataRef animar={animar} Complete={handleCompleteAnimar} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <br />
          <br />
          <Paper>
            <Tabla vista="mascotas" data={entradas} onEliminarFila={handleEliminarFila} />
          </Paper>
        </Box>
      </Box>
    </Home>
  );
}
