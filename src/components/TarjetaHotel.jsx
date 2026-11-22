function TarjetaHotel({ hotel }) {
  return (
    <article className="opcion-card">
      <h3>{hotel.nombre}</h3>
      <p>Precio por noche: ${hotel.precio.toLocaleString("es-CL")}</p>
      <p>Fecha: {hotel.fecha}</p>
      <p>
        Disponibilidad: {hotel.disponibilidad ? "Disponible" : "Agotado"}
      </p>
    </article>
  );
}

export default TarjetaHotel;
