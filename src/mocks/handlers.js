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
  },
  {
    id: "3",
    destinoId: "2",
    aerolinea: "LATAM",
    precio: 520000,
    fecha: "2026-12-17",
    disponibilidad: 12
  },
  {
    id: "4",
    destinoId: "2",
    aerolinea: "GOL",
    precio: 480000,
    fecha: "2026-12-18",
    disponibilidad: 10
  },
  {
    id: "5",
    destinoId: "3",
    aerolinea: "Air France",
    precio: 850000,
    fecha: "2026-12-19",
    disponibilidad: 15
  },
  {
    id: "6",
    destinoId: "3",
    aerolinea: "LATAM",
    precio: 790000,
    fecha: "2026-12-20",
    disponibilidad: 8
  },
  {
    id: "7",
    destinoId: "4",
    aerolinea: "Japan Airlines",
    precio: 1100000,
    fecha: "2026-12-21",
    disponibilidad: 10
  },
  {
    id: "8",
    destinoId: "4",
    aerolinea: "LATAM",
    precio: 1050000,
    fecha: "2026-12-22",
    disponibilidad: 7
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
  },
  {
    id: "3",
    destinoId: "2",
    nombre: "Hotel Copacabana",
    precio: 95000,
    fecha: "2026-12-17",
    disponibilidad: 12
  },
  {
    id: "4",
    destinoId: "2",
    nombre: "Rio Palace",
    precio: 130000,
    fecha: "2026-12-18",
    disponibilidad: 6
  },
  {
    id: "5",
    destinoId: "3",
    nombre: "Hotel Eiffel",
    precio: 150000,
    fecha: "2026-12-19",
    disponibilidad: 9
  },
  {
    id: "6",
    destinoId: "3",
    nombre: "Paris Central",
    precio: 180000,
    fecha: "2026-12-20",
    disponibilidad: 5
  },
  {
    id: "7",
    destinoId: "4",
    nombre: "Tokyo Inn",
    precio: 110000,
    fecha: "2026-12-21",
    disponibilidad: 11
  },
  {
    id: "8",
    destinoId: "4",
    nombre: "Sakura Hotel",
    precio: 140000,
    fecha: "2026-12-22",
    disponibilidad: 7
  }
];

export const handlers = [
  http.get(`${import.meta.env.BASE_URL}api/destinos`, () => {
    return HttpResponse.json(destinos);
  }),

  http.post(`${import.meta.env.BASE_URL}graphql`, async ({ request }) => {
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
