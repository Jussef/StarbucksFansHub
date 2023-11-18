import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Box, Grid, Fab, Paper, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "../Home/Home";
import Loading from "../../Components/Loading";
import Footer from "../../Components/Footer";
import Swal from "sweetalert2";
import PaperPresupuesto from "../../Components/PaperPresupuesto";
import CardPresupuesto from "../../Components/CardPresupuesto";
import DialogNewGasto from "../../Components/DialogNewGasto";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { getCollectionsComplete, updateDataValue, cambiosDB } from "../../Utils/helpers";
import "./styles.scss";

const theme = createTheme({
  palette: {
    primary: {
      light: "#a44fbb",
      main: "#8e24aa",
      dark: "#631976",
      contrastText: "#fff",
    },
    secondary: {
      light: "#51d1e1",
      main: "#26c6da",
      dark: "#1a8a98",
      contrastText: "#000",
    },
  },
});

export default function Presupuesto() {
  const navigate = useNavigate();
  const [dataInicial, setDataInicial] = useState(0);
  const [inicial, setInicial] = useState(0);
  const [actual, setActual] = useState(0);
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("");
  const [gastos, setGastos] = useState([]);
  const [qActual, setQActual] = useState("");
  const [openNewGasto, setOpenNewGasto] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getEntradas();
  }, []);

  const getEntradas = async () => {
    const data = await getCollectionsComplete(`quincenas`);
    const getQuincena = data["qActual"];
    const getInicial = data[getQuincena]["inicial"];
    const getActual = data[getQuincena]["actual"];
    const getFecha = data[getQuincena]["fecha"];
    const getTipo = data[getQuincena]["tipo"];
    const getGastos = data[getQuincena]["gastos"];
    const inicialFormateado = getInicial.toLocaleString();

    setDataInicial(data);
    setInicial(inicialFormateado);
    setFecha(getFecha);
    setTipo(getTipo);
    setGastos(getGastos);
    setQActual(getQuincena);

    // SUMA Gastos
    let total = getInicial;
    const gastos = await getCollectionsComplete(`quincenas/${getQuincena}/gastos`);

    Object.values(gastos).map((value) => {
      if (value) {
        total -= value.costo;
      }
    });

    const actualFormateado = total.toLocaleString();
    setActual(actualFormateado);
    updateDataValue(`quincenas/${getQuincena}`, "actual", total);

    setCargando(false);
  };

  const cambiaInicial = async () => {
    const qActual = dataInicial["qActual"];
    Swal.fire({
      title: "Presupuesto inicial",
      input: "number",
      inputLabel: "Cambia el monto para esta quincena",
      inputPlaceholder: "$000",
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#2D6DB4",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateDataValue(`quincenas/${qActual}`, "inicial", result.value)
          .then(() => {
            Swal.fire({
              title: "¡Listo!",
              text: `Se cambio a: ${result.value}`,
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

  const cambiaQActual = (avanza) => {
    if (avanza) {
      const ultimoCaracter = qActual[qActual.length - 1];
      if (ultimoCaracter < 8) {
        let aumenta = parseInt(ultimoCaracter) + 1;
        let createQActual = "q" + aumenta;
        console.log(createQActual);
        setQActual(createQActual);
        updateDataValue(`quincenas`, "qActual", createQActual);
        getEntradas();
      }
    } else {
      const ultimoCaracter = qActual[qActual.length - 1];
      if (ultimoCaracter > 1) {
        let aumenta = parseInt(ultimoCaracter) - 1;
        let createQActual = "q" + aumenta;
        console.log(createQActual);
        setQActual(createQActual);
        updateDataValue(`quincenas`, "qActual", createQActual);
        getEntradas();
      }
    }
  };

  const creaNuevoGasto = (childProp) => {
    console.log("%c childProp", "font-size: 100%; color: #fff200; font-weight: 700;");
    console.log(childProp);

    if (childProp === undefined) {
      Swal.fire({
        title: "Gasto Nuevo",
        confirmButtonText: "Nuevo",
        confirmButtonColor: "#33aa00",
        showDenyButton: true,
        denyButtonText: "Existente",
        denyButtonColor: "#00a0bc",
      }).then((result) => {
        if (result.isConfirmed) {
          setOpenNewGasto(true);
          Swal.close();
        } else if (result.isDenied) {
          console.log("TODO");
          Swal.close();
        }
      });
    } else {
      setOpenNewGasto(false);
      getEntradas();
    }
  };

  const recargarVista = () => {
    // window.location.reload();
    setGastos([]);
    getEntradas();
  };

  return (
    <>
      {cargando === true ? (
        <Loading />
      ) : (
        <Home vista={2}>
          <ThemeProvider theme={theme}>
            <Box className="presupuesto">
              <h2 className="titulo">Presupuesto</h2>
              <h3 className="subtitulo">
                <CalendarMonthIcon sx={{ fontSize: 30 }} />
                &nbsp;&nbsp;{fecha}
                <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                  <Grid md={1} xs={2}>
                    <IconButton style={{ color: theme.palette.primary.dark }} onClick={() => cambiaQActual(false)}>
                      <ArrowCircleLeftIcon className="btnPages" />
                    </IconButton>
                  </Grid>
                  <Grid md={1} xs={2}>
                    <IconButton style={{ color: theme.palette.primary.dark }} onClick={() => cambiaQActual(true)}>
                      <ArrowCircleRightIcon className="btnPages" />
                    </IconButton>
                  </Grid>
                </Grid>
              </h3>
              <Paper elevation={3} className="paper paperDinero">
                <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
                  <Grid md={2} xs={12}>
                    <Box>
                      <Grid direction="col" className="flexCenterCol">
                        <Grid item>
                          <p className="dineroTitulo">Inicial</p>
                        </Grid>
                        <Grid item>
                          <p className="flexCenterRow dineroInit">
                            <AttachMoneyIcon sx={{ fontSize: 30 }} />
                            {inicial}
                          </p>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid md={2} xs={12}>
                    <Box>
                      <Grid direction="col" className="flexCenterCol">
                        <Grid item>
                          <p className="dineroTitulo">Actual</p>
                        </Grid>
                        <Grid item>
                          <p className="flexCenterRow dineroActual">
                            <AttachMoneyIcon sx={{ fontSize: 40 }} />
                            {actual}
                          </p>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid md={8} xs={12}>
                    <Box className="flexEnd iconEdit">
                      <Fab size="small" color="secondary" aria-label="editar" onClick={() => cambiaInicial()}>
                        <EditIcon />
                      </Fab>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
              <br />
              <Box textAlign="center">
                <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
                  {(() => {
                    switch (tipo) {
                      case "chica":
                        return (
                          <>
                            <Grid item md={3} xs={9}>
                              <PaperPresupuesto cualFijo="izzi" />
                            </Grid>
                            <Grid item md={3} xs={9}>
                              <PaperPresupuesto cualFijo="arena" />
                            </Grid>
                            <Grid item md={3} xs={9}>
                              <PaperPresupuesto cualFijo="gasolina" />
                            </Grid>
                          </>
                        );
                      case "grande":
                        return (
                          <>
                            <PaperPresupuesto cualFijo="telcel" />
                            <PaperPresupuesto cualFijo="arena" />
                            <PaperPresupuesto cualFijo="gasolina" />
                          </>
                        );
                      default:
                        return <div>No se encontró un tipo válido</div>;
                    }
                  })()}
                </Grid>
              </Box>
              <Box textAlign="center">
                <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
                  <Grid md={2} xs={12}>
                    <Box>
                      <Grid direction="col" className="flexCenterCol">
                        <Grid item>
                          <p className="">Tabla de Gastos</p>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  {gastos &&
                    Object.values(gastos).map((value) => (
                      <Grid item md={3} xs={6}>
                        <CardPresupuesto
                          id={value.id}
                          qActual={qActual}
                          refresh={() => {
                            recargarVista();
                          }}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
              <Fab size="medium" color="primary" aria-label="add" className="botonFab" onClick={() => creaNuevoGasto()}>
                <AddIcon />
              </Fab>
              <DialogNewGasto abrir={openNewGasto} onHandleClose={creaNuevoGasto} qActual={qActual} gastos={gastos ? gastos : []} />
            </Box>
          </ThemeProvider>
          <Footer />
        </Home>
      )}
    </>
  );
}
