import * as React from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { deleteData, updateData } from "../../Utils/helpers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TablaPresupuesto({ vista, data, onEliminarFila }) {
  const rows = [];
  Object.keys(data).forEach((key) => {
    const info = data[key];
    const { fecha, kilos, diasTranscurridos } = info;
    rows.push({ ID: key, fecha, kilos, diasTranscurridos });
    rows.sort((a, b) => dayjs(b.fecha, "DD-MM-YYYY").diff(dayjs(a.fecha, "DD-MM-YYYY")));
  });

  const eliminarFila = (ID, dia) => {
    console.log("%c :::", "font-size: 100%; color: #ff001e; font-weight: 700;");
    console.log(ID);
    console.log(dia);
    
    Swal.fire({
      title: "¡Advertencia!",
      text: "¿Deseas eliminar este día "+ dia +"?",
      icon: "warning",
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#2D6DB4",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // updateData(`mascotas/croquetas`, ID, { activo: false })
        deleteData(`mascotas/croquetas`, ID)
          .then(() => {
            Swal.fire({
              title: "¡Listo!",
              text: "Día eliminado",
              icon: "success",
              confirmButtonText: "Confirmar",
              confirmButtonColor: "#2D6DB4",
            }).then((result) => {
              if (result.isConfirmed) {
                // Llamada a la funcion del hijo al padre por props para recargar la tabla
                onEliminarFila(ID);
              }
            });
          })
          .catch((e) => console.log(e));
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align="center">Kilos</TableCell>
            <TableCell align="center">Días transcurridos</TableCell>
            <TableCell align="center">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.ID}>
              <TableCell component="th" scope="row">
                {row.fecha}
              </TableCell>
              <TableCell align="center">{row.kilos}</TableCell>
              <TableCell align="center">{row.diasTranscurridos}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="delete" color="error">
                  <DeleteIcon onClick={() => eliminarFila(row.ID, row.fecha)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
