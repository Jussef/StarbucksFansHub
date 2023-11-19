import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "../Components/Loading";

const Lanzamientos = lazy(() => import("../Layouts/Lanzamientos"));

// Vistas Back end
// const HomeAdministrador = lazy(() => import("../views/Adminstration/Home"));

export default function Navigation() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Lanzamientos />} />
          <Route exact path="/lanzamientos" element={<Lanzamientos />} />

          {/* <Route exact path="/admin/dashboard" element={<HomeAdministrador />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
