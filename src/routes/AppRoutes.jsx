import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Inicio = lazy(() => import("../pages/Inicio.jsx"));
const DetalleDestino = lazy(() => import("../pages/DetalleDestino.jsx"));

function AppRoutes() {
  return (
    <Suspense fallback={<p>Cargando pantalla...</p>}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/destinos/:id" element={<DetalleDestino />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
