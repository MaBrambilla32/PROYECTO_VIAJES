export async function obtenerViajes(destinoId) {
  const consulta = `
    query ObtenerViajes($destinoId: Int!) {
      vuelos(destinoId: $destinoId) {
        id
        aerolinea
        precio
        fecha
        disponibilidad
      }
      hoteles(destinoId: $destinoId) {
        id
        nombre
        precio
        fecha
        disponibilidad
      }
    }
  `;

  const respuesta = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName: "ObtenerViajes",
      query: consulta,
      variables: {
        destinoId: Number(destinoId),
      },
    }),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudieron consultar los vuelos y hoteles");
  }

  const resultado = await respuesta.json();

  if (resultado.errors) {
    throw new Error(resultado.errors[0].message);
  }

  return resultado.data;
}
