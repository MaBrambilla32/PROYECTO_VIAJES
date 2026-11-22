import { http, HttpResponse } from "msw";
import { buildSchema, graphql } from "graphql";

const destinos = [
  {
    id: 1,
    nombre: "Cancún",
    pais: "México",
    descripcion: "Playas paradisíacas y aguas cristalinas.",
    actividades: ["Snorkel", "Buceo", "Visitar cenotes"],
    imagen: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2",
  },
  {
    id: 2,
    nombre: "Río de Janeiro",
    pais: "Brasil",
    descripcion: "Disfruta sus playas y paisajes naturales.",
    actividades: ["Cristo Redentor", "Copacabana", "Senderismo"],
    imagen: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
  },
  {
    id: 3,
    nombre: "París",
    pais: "Francia",
    descripcion: "Descubre la ciudad del amor y su cultura.",
    actividades: ["Torre Eiffel", "Museo del Louvre", "Paseos por el Sena"],
    imagen: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  },
  {
    id: 4,
    nombre: "Tokio",
    pais: "Japón",
    descripcion: "Conoce una ciudad llena de tecnología y tradición.",
    actividades: ["Templos", "Gastronomía japonesa", "Shibuya"],
    imagen: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
  },
];

const vuelos = [
  { id: 1, destinoId: 1, aerolinea: "LATAM", precio: 450000, fecha: "2027-01-15", disponibilidad: true },
  { id: 2, destinoId: 1, aerolinea: "Sky Airline", precio: 390000, fecha: "2027-01-20", disponibilidad: true },
  { id: 3, destinoId: 2, aerolinea: "LATAM", precio: 320000, fecha: "2027-02-10", disponibilidad: true },
  { id: 4, destinoId: 2, aerolinea: "Avianca", precio: 350000, fecha: "2027-02-15", disponibilidad: false },
  { id: 5, destinoId: 3, aerolinea: "Air France", precio: 780000, fecha: "2027-03-05", disponibilidad: true },
  { id: 6, destinoId: 4, aerolinea: "Japan Airlines", precio: 950000, fecha: "2027-04-12", disponibilidad: true },
];

const hoteles = [
  { id: 1, destinoId: 1, nombre: "Hotel Caribe", precio: 85000, fecha: "2027-01-15", disponibilidad: true },
  { id: 2, destinoId: 1, nombre: "Resort Paradise", precio: 120000, fecha: "2027-01-20", disponibilidad: true },
  { id: 3, destinoId: 2, nombre: "Hotel Copacabana", precio: 70000, fecha: "2027-02-10", disponibilidad: true },
  { id: 4, destinoId: 3, nombre: "Hotel Eiffel", precio: 150000, fecha: "2027-03-05", disponibilidad: true },
  { id: 5, destinoId: 4, nombre: "Tokyo Central Hotel", precio: 110000, fecha: "2027-04-12", disponibilidad: false },
];

const esquema = buildSchema(`
  type Vuelo {
    id: ID!
    aerolinea: String!
    precio: Int!
    fecha: String!
    disponibilidad: Boolean!
  }

  type Hotel {
    id: ID!
    nombre: String!
    precio: Int!
    fecha: String!
    disponibilidad: Boolean!
  }

  type Query {
    vuelos(destinoId: Int!): [Vuelo!]!
    hoteles(destinoId: Int!): [Hotel!]!
  }
`);

const resolvers = {
  vuelos: ({ destinoId }) =>
    vuelos.filter((vuelo) => vuelo.destinoId === destinoId),

  hoteles: ({ destinoId }) =>
    hoteles.filter((hotel) => hotel.destinoId === destinoId),
};

export const handlers = [
  http.get("/api/destinos", () => {
    return HttpResponse.json(destinos);
  }),

  http.post("/graphql", async ({ request }) => {
    const body = await request.json();

    const resultado = await graphql({
      schema: esquema,
      source: body.query,
      rootValue: resolvers,
      variableValues: body.variables,
      operationName: body.operationName,
    });

    return HttpResponse.json(resultado);
  }),
];
