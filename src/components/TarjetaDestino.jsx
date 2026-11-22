import { Link } from "react-router-dom";

function TarjetaDestino({ destino }) {
  return (
    <article className="destino-card">
      <img src={destino.imagen} alt={destino.nombre} />

      <div className="destino-info">
        <h2>{destino.nombre}</h2>
        <p>{destino.pais}</p>
        <p>{destino.descripcion}</p>

        <h3>Actividades populares</h3>
        <ul>
          {destino.actividades.map((actividad) => (
            <li key={actividad}>{actividad}</li>
          ))}
        </ul>

        <Link to={`/destinos/${destino.id}`}>
          Ver vuelos y hoteles
        </Link>
      </div>
    </article>
  );
}

export default TarjetaDestino;
