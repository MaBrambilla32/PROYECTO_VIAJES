import { useEffect, useState } from "react";
import { obtenerDestinos } from "../services/destinosService";
import TarjetaDestino from "../components/TarjetaDestino";

function Inicio() {
  const [destinos, setDestinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDestinos() {
      try {
        const datos = await obtenerDestinos();
        setDestinos(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarDestinos();
  }, []);

  if (cargando) return <p className="contenedor">Cargando destinos...</p>;

  if (error) return <p className="contenedor">Error: {error}</p>;

  return (
    <main className="contenedor">
      <h1>Descubre tu próximo destino</h1>
      <p>Explora lugares increíbles y planifica tu próximo viaje.</p>

      <section className="destinos-grid">
        {destinos.map((destino) => (
          <TarjetaDestino key={destino.id} destino={destino} />
        ))}
      </section>
    </main>
  );
}

export default Inicio;
