let destinosCacheados = null;

export async function obtenerDestinos() {
  if (destinosCacheados) {
    return destinosCacheados;
  }

  const respuesta = await fetch(
    `${import.meta.env.BASE_URL}api/destinos`
  );

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los destinos");
  }

  destinosCacheados = await respuesta.json();

  return destinosCacheados;
}
