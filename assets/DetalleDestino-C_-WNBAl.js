import{a as e,i as t,n,r,t as i}from"./index-CZ5OZWs3.js";var a=e(t(),1);async function o(e){let t=await fetch(`/PROYECTO_VIAJES/graphql`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({operationName:`ObtenerViajes`,query:`
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
  `,variables:{destinoId:Number(e)}})});if(!t.ok)throw Error(`No se pudieron consultar los vuelos y hoteles`);let n=await t.json();if(n.errors)throw Error(n.errors[0].message);return n.data}var s=i();function c({vuelo:e}){return(0,s.jsxs)(`article`,{className:`opcion-card`,children:[(0,s.jsx)(`h3`,{children:e.aerolinea}),(0,s.jsxs)(`p`,{children:[`Precio: $`,e.precio.toLocaleString(`es-CL`)]}),(0,s.jsxs)(`p`,{children:[`Fecha: `,e.fecha]}),(0,s.jsxs)(`p`,{children:[`Disponibilidad: `,e.disponibilidad?`Disponible`:`Agotado`]})]})}function l({hotel:e}){return(0,s.jsxs)(`article`,{className:`opcion-card`,children:[(0,s.jsx)(`h3`,{children:e.nombre}),(0,s.jsxs)(`p`,{children:[`Precio por noche: $`,e.precio.toLocaleString(`es-CL`)]}),(0,s.jsxs)(`p`,{children:[`Fecha: `,e.fecha]}),(0,s.jsxs)(`p`,{children:[`Disponibilidad: `,e.disponibilidad?`Disponible`:`Agotado`]})]})}function u(){let{id:e}=r(),[t,i]=(0,a.useState)({vuelos:[],hoteles:[]}),[u,d]=(0,a.useState)(!0),[f,p]=(0,a.useState)(``);return(0,a.useEffect)(()=>{async function t(){d(!0),p(``);try{let t=await o(e);i(t)}catch(e){p(e.message)}finally{d(!1)}}t()},[e]),u?(0,s.jsx)(`main`,{className:`contenedor`,children:`Cargando vuelos y hoteles...`}):f?(0,s.jsxs)(`main`,{className:`contenedor`,children:[`Error: `,f]}):(0,s.jsxs)(`main`,{className:`contenedor`,children:[(0,s.jsx)(n,{to:`/`,children:`← Volver a destinos`}),(0,s.jsx)(`h1`,{children:`Opciones de viaje`}),(0,s.jsxs)(`section`,{children:[(0,s.jsx)(`h2`,{children:`Vuelos disponibles`}),t.vuelos.length===0?(0,s.jsx)(`p`,{children:`No hay vuelos registrados para este destino.`}):t.vuelos.map(e=>(0,s.jsx)(c,{vuelo:e},e.id))]}),(0,s.jsxs)(`section`,{children:[(0,s.jsx)(`h2`,{children:`Hoteles disponibles`}),t.hoteles.length===0?(0,s.jsx)(`p`,{children:`No hay hoteles registrados para este destino.`}):t.hoteles.map(e=>(0,s.jsx)(l,{hotel:e},e.id))]})]})}export{u as default};