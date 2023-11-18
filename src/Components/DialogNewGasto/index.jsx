import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import { Box, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getCollectionsComplete, updateDataValue, updateDataSimple } from "../../Utils/helpers";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

export default function DialogNewGasto({ abrir, onHandleClose, qActual, gastos }) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [tipo, setTipo] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (abrir) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [abrir]);

  const handleClose = () => {
    setOpen(false);
    // Llamada a la funcion del hijo al padre por props para cerrar dialog
    onHandleClose(false);
  };

  const addNombre = (event) => {
    setNombre(event.target.value);
  };
  const addCosto = (event) => {
    setCosto(event.target.value);
  };
  const cambiarTipo = (event) => {
    setTipo(event.target.value);
  };

  const guardarNuevoGasto = async () => {
    const id = uniqid();
    const getFolio = await getCollectionsComplete(`quincenas/folio`);
    let createFolio = `${getFolio}-${id}`;
    const jsonGastos = {
      gastos,
    };
    const json = {
      [createFolio]: {
        costo: costo,
        nombre: nombre,
        tipo: tipo,
        id: id,
        fecha: id,
      },
    };
    updateDataSimple(`quincenas/${qActual}/gastos`, json).then(() => {
      // Agregar createFolio al objeto de gastos con una clave numérica
      // gastos[Object.keys(gastos).length.toString()] = createFolio;
      gastos[getFolio] = createFolio;
      
      // updateDataSimple(`quincenas/${qActual}`, jsonGastos).then(() => {
      // updateDataSimple(`quincenas/${qActual}/gastos`, json).then(() => {
        updateDataValue(`quincenas`, "folio", getFolio + 1).then(() => {
          onHandleClose(false);
        });
      // });
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
        <DialogTitle>Nuevo Gasto</DialogTitle>
        <DialogContent>
          <DialogContentText>Ingresa los datos de este gasto.</DialogContentText>
          <br />
          <Box textAlign="center">
            <Grid container direction="row" spacing={2}>
              <Grid item md={4} xs={6}>
                <TextField autoFocus margin="dense" id="nombre" label="Nombre" type="text" fullWidth variant="outlined" onChange={addNombre} />
              </Grid>
              <Grid item md={4} xs={6}>
                <TextField
                  margin="dense"
                  id="costo"
                  label="Costo"
                  type="number"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  onChange={addCosto}
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <FormControl fullWidth variant="outlined" margin="dense">
                  <InputLabel id="labelTipo">Tipo</InputLabel>
                  <Select labelId="labelTipo" value={tipo} label="Tipo" onChange={cambiarTipo}>
                    <MenuItem value={"basic"}>Basico</MenuItem>
                    <MenuItem value={"super"}>Detallado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="success" variant="contained" onClick={guardarNuevoGasto}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
