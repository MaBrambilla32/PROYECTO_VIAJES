function TarjetaVuelo({ vuelo }) {
  return (
    <article className="opcion-card">
      <h3>{vuelo.aerolinea}</h3>
      <p>Precio: ${vuelo.precio.toLocaleString("es-CL")}</p>
      <p>Fecha: {vuelo.fecha}</p>
      <p>
        Disponibilidad: {vuelo.disponibilidad ? "Disponible" : "Agotado"}
      </p>
    </article>
  );
}

export default TarjetaVuelo;
