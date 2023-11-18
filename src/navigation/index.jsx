import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "../Components/Loading";

const Reto = lazy(() => import("../Layouts/Reto/Reto"));
const Mascotas = lazy(() => import("../Layouts/Mascotas/Mascotas"));
const Presupuesto = lazy(() => import("../Layouts/Presupuesto/Presupuesto"));

// Vistas Back end
// const HomeAdministrador = lazy(() => import("../views/Adminstration/Home"));

export default function Navigation() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Reto />} />
          <Route exact path="/reto" element={<Reto />} />
          <Route exact path="/mascotas" element={<Mascotas />} />
          <Route exact path="/presupuesto" element={<Presupuesto />} />

          {/* <Route exact path="/admin/dashboard" element={<HomeAdministrador />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
