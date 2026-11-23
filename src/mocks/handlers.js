import { http, HttpResponse } from "msw";

const destinos = [
  {
    id: "1",
    nombre: "Cancún",
    pais: "México",
    descripcion: "Disfruta de playas de aguas cristalinas y arena blanca.",
    imagen: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2",
    actividades: ["Playas", "Buceo", "Excursiones"]
  },
  {
    id: "2",
    nombre: "Río de Janeiro",
    pais: "Brasil",
    descripcion: "Descubre sus playas, paisajes y cultura.",
    imagen: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
    actividades: ["Playas", "Turismo", "Gastronomía"]
  },
  {
    id: "3",
    nombre: "París",
    pais: "Francia",
    descripcion: "Conoce la ciudad del amor y sus monumentos.",
    imagen: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    actividades: ["Museos", "Cultura", "Gastronomía"]
  },
  {
    id: "4",
    nombre: "Tokio",
    pais: "Japón",
    descripcion: "Explora una ciudad que combina tradición y tecnología.",
    imagen: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    actividades: ["Tecnología", "Cultura", "Compras"]
  }
];

const vuelos = [
  {
    id: "1",
    destinoId: "1",
    aerolinea: "LATAM",
    precio: 450000,
    fecha: "2026-12-15",
    disponibilidad: 20
  },
  {
    id: "2",
    destinoId: "1",
    aerolinea: "Sky Airline",
    precio: 390000,
    fecha: "2026-12-16",
    disponibilidad: 15
  }
];

const hoteles = [
  {
    id: "1",
    destinoId: "1",
    nombre: "Hotel Caribe",
    precio: 85000,
    fecha: "2026-12-15",
    disponibilidad: 10
  },
  {
    id: "2",
    destinoId: "1",
    nombre: "Resort Paradise",
    precio: 120000,
    fecha: "2026-12-15",
    disponibilidad: 8
  }
];

export const handlers = [
  http.get("/api/destinos", () => {
    return HttpResponse.json(destinos);
  }),

  http.post("/graphql", async ({ request }) => {
    const body = await request.json();
    const { operationName, variables } = body;

    if (operationName === "ObtenerViajes") {
      const destinoId = variables?.destinoId;

      return HttpResponse.json({
        data: {
          vuelos: vuelos.filter(
            (vuelo) => vuelo.destinoId === String(destinoId)
          ),
          hoteles: hoteles.filter(
            (hotel) => hotel.destinoId === String(destinoId)
          )
        }
      });
    }

    return HttpResponse.json({
      errors: [{ message: "Operación GraphQL no encontrada" }]
    });
  })
];
