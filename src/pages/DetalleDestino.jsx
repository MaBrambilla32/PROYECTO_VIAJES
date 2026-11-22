import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerViajes } from "../services/viajesService";
import TarjetaVuelo from "../components/TarjetaVuelo";
import TarjetaHotel from "../components/TarjetaHotel";

function DetalleDestino() {
  const { id } = useParams();

  const [viajes, setViajes] = useState({
    vuelos: [],
    hoteles: [],
  });

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarViajes() {
      setCargando(true);
      setError("");

      try {
        const datos = await obtenerViajes(id);
        setViajes(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarViajes();
  }, [id]);

  if (cargando) {
    return <main className="contenedor">Cargando vuelos y hoteles...</main>;
  }

  if (error) {
    return <main className="contenedor">Error: {error}</main>;
  }

  return (
    <main className="contenedor">
      <Link to="/">← Volver a destinos</Link>

      <h1>Opciones de viaje</h1>

      <section>
        <h2>Vuelos disponibles</h2>

        {viajes.vuelos.length === 0 ? (
          <p>No hay vuelos registrados para este destino.</p>
        ) : (
          viajes.vuelos.map((vuelo) => (
            <TarjetaVuelo key={vuelo.id} vuelo={vuelo} />
          ))
        )}
      </section>

      <section>
        <h2>Hoteles disponibles</h2>

        {viajes.hoteles.length === 0 ? (
          <p>No hay hoteles registrados para este destino.</p>
        ) : (
          viajes.hoteles.map((hotel) => (
            <TarjetaHotel key={hotel.id} hotel={hotel} />
          ))
        )}
      </section>
    </main>
  );
}

export default DetalleDestino;
