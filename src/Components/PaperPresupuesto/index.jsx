import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button, Box, Grid, Select, MenuItem, FormControl, InputLabel, Paper, IconButton, Fab } from "@mui/material";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import BorderClearIcon from "@mui/icons-material/BorderClear";
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { getCollectionsComplete, getDataNodo, getCollections } from "../../Utils/helpers";
import "./styles.scss";

export default function PaperPresupuesto({ cualFijo }) {
  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [icono, setIcono] = useState("");
  const [cualesFijos, setCualesFijos] = useState({});

  useEffect(() => {
    filterFijos();
  }, [costo]);

  const filterFijos = async () => {
    const data = await getCollectionsComplete(`presupuesto/fijos`);
    setCualesFijos(data);
    setCosto(cualesFijos[cualFijo]);
    switch (cualFijo) {
      case "izzi":
        setIcono(<SatelliteAltIcon className="iconoPaper" />);
        setNombre("Izzi");
        break;
      case "arena":
        setIcono(<CleaningServicesIcon className="iconoPaper" />);
        setNombre("Arena");
        break;
      case "telcel":
        setIcono(<PhoneAndroidIcon className="iconoPaper" />);
        setNombre("Telcel");
        break;
      case "prestaprenda":
        setIcono(<PointOfSaleIcon className="iconoPaper" />);
        setNombre("PrestaPrenda");
        break;
      case "gasolina":
        setIcono(<LocalGasStationIcon className="iconoPaper" />);
        setNombre("Gasolina");
        break;

      default:
        setIcono(<BorderClearIcon className="iconoPaper" />);
        break;
    }
  };

  return (
    <Grid md={3} xs={12} sx={{ mb: 2 }}>
      <Paper elevation={3} className="paper paperFijos">
        <Box textAlign="start">
          {icono}
          <h3 className="tituloPaper">{nombre}</h3>
          <p className="costoPaper">$ {costo}</p>
        </Box>
      </Paper>
    </Grid>
  );
}
