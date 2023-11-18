import React, { useEffect, useState } from "react";
import { Button, CardActionArea, CardActions, IconButton, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Lottie from "lottie-react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { getCollectionsComplete, deleteData, updateData, searchDataByValue } from "../../Utils/helpers";
import "./styles.scss";

export default function CardPresupuesto({ id, qActual, refresh }) {
  const [info, setInfo] = useState("");
  const [gastosAsignados, setGastosAsignados] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const data = await getCollectionsComplete(`quincenas/${qActual}/gastos/${id}`);
    setInfo(data);
    console.log("%c :::", "font-size: 100%; color: #ff001e; font-weight: 700;");
    console.log(data);
  };

  const eliminarCard = () => {
    const key = id[0];
    console.log(`quincenas/cardsGasto`, id);
    console.log(`quincenas/${qActual}/gastos`, key);

    Swal.fire({
      title: "¡Advertencia!",
      text: "¿Deseas eliminar este gasto " + info.nombre + "?",
      icon: "warning",
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#2D6DB4",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // updateData(`quincenas/cardsGasto`, id, { activo: false })
        // deleteData(`quincenas/cardsGasto`, id);
        deleteData(`quincenas/${qActual}/gastos`, id)
          .then(() => {
            Swal.fire({
              title: "!Eliminado!",
              // text: "Eliminado",
              icon: "success",
              confirmButtonText: "Confirmar",
              confirmButtonColor: "#2D6DB4",
            }).then((result) => {
              if (result.isConfirmed) {
                refresh(true);
              }
            });
          })
          .catch((e) => console.log(e));
      }
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }} className={info.tipo === "basic" ? "cardBasic" : "cardSuper"}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom component="div" style={{ fontSize: "1.2rem", height: "60px" }}>
            {info.nombre}
          </Typography>
          <Typography color="text.secondary" style={{ fontSize: "1.3rem" }}>
            ${info.costo}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="eliminar">
          <DeleteIcon onClick={() => eliminarCard()} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
