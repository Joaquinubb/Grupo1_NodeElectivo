import { prisma } from "./src/data/postgres";

async function main() {
  const arbitros = [
    {
      nombre_arbitro: "Piero",
      apellido_arbitro: "Maza",
      fechaNac_arbitro: new Date("1984-10-25T00:00:00Z"),
    },
    {
      nombre_arbitro: "José",
      apellido_arbitro: "Cabero",
      fechaNac_arbitro: new Date("1984-10-09T00:00:00Z"),
    },
    {
      nombre_arbitro: "Francisco",
      apellido_arbitro: "Gilabert",
      fechaNac_arbitro: new Date("1982-04-30T00:00:00Z"),
    },
    {
      nombre_arbitro: "Felipe",
      apellido_arbitro: "González Alveal",
      fechaNac_arbitro: new Date("1980-03-16T00:00:00Z"),
    },
    {
      nombre_arbitro: "Nicolás",
      apellido_arbitro: "Gamboa",
      fechaNac_arbitro: new Date("1987-12-02T00:00:00Z"),
    },
    {
      nombre_arbitro: "Cristian",
      apellido_arbitro: "Garay",
      fechaNac_arbitro: new Date("1989-04-08T00:00:00Z"),
    },
    {
      nombre_arbitro: "Fernando",
      apellido_arbitro: "Véjar",
      fechaNac_arbitro: new Date("1989-07-12T00:00:00Z"),
    },
    {
      nombre_arbitro: "Manuel",
      apellido_arbitro: "Vergara",
      fechaNac_arbitro: new Date("1990-07-13T00:00:00Z"),
    },
    {
      nombre_arbitro: "Juan",
      apellido_arbitro: "Sepúlveda",
      fechaNac_arbitro: new Date("1989-08-28T00:00:00Z"),
    },
    {
      nombre_arbitro: "Diego",
      apellido_arbitro: "Flores Seguel",
      fechaNac_arbitro: new Date("1990-01-02T00:00:00Z"),
    },
    {
      nombre_arbitro: "Héctor",
      apellido_arbitro: "Jona",
      fechaNac_arbitro: new Date("1982-06-03T00:00:00Z"),
    },
    {
      nombre_arbitro: "Matías",
      apellido_arbitro: "Quila",
      fechaNac_arbitro: new Date("1992-11-25T00:00:00Z"),
    },
    {
      nombre_arbitro: "Benjamín",
      apellido_arbitro: "Saravia",
      fechaNac_arbitro: new Date("1987-08-24T00:00:00Z"),
    },
    {
      nombre_arbitro: "Gustavo",
      apellido_arbitro: "Ahumada",
      fechaNac_arbitro: new Date("1985-02-25T00:00:00Z"),
    },
    {
      nombre_arbitro: "Juan",
      apellido_arbitro: "Lara",
      fechaNac_arbitro: new Date("1989-04-05T00:00:00Z"),
    },
    {
      nombre_arbitro: "Rodrigo",
      apellido_arbitro: "Carvajal",
      fechaNac_arbitro: new Date("1986-06-01T00:00:00Z"),
    },
  ];

  const clubes = [
    {
      nombre_club: "Audax Italiano",
      ciudad_club: "La Florida, Santiago",
      estadio_club: "Bicentenario de la Florida",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes//0761d723a884d13d188a777e009b5fab.png",
      fechaFund_club: new Date("1910-11-30T00:00:00Z"),
      titulosPrimera_club: 4,
    },
    {
      nombre_club: "Cobreloa",
      ciudad_club: "Calama",
      estadio_club: "Zorros del Desierto",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes//1a0ab0b4105e83d27eb9e1808f82f040.png",
      fechaFund_club: new Date("1977-01-07T00:00:00Z"),
      titulosPrimera_club: 8,
    },
    {
      nombre_club: "Cobresal",
      ciudad_club: "El Salvador, Atacama",
      estadio_club: "El Cobre",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes/831340ccfeb595f722e7ae6009c5f7d7.png",
      fechaFund_club: new Date("1979-05-05T00:00:00Z"),
      titulosPrimera_club: 1,
    },
    {
      nombre_club: "Colo Colo",
      ciudad_club: "Santiago, Santiago",
      estadio_club: "Monumental, David Arellano",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes/04331fe9ff4e3caecd72877a6e9669dd.png",
      fechaFund_club: new Date("1979-04-19T00:00:00Z"),
      titulosPrimera_club: 33,
    },
    {
      nombre_club: "Coquimbo Unido",
      ciudad_club: "Coquimbo",
      estadio_club: "Municipal Francisco Sánchez Rumoroso",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes//c016a84a402cb6399df331159734488f.png",
      fechaFund_club: new Date("1958-08-30T00:00:00Z"),
      titulosPrimera_club: 0,
    },
    {
      nombre_club: "Deportes Copiapó",
      ciudad_club: "Copiapó, Atacama",
      estadio_club: "Luis Valenzuela Hermosilla",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes/6004aae86c052ca976eca2421f877304.png",
      fechaFund_club: new Date("1999-03-09T00:00:00Z"),
      titulosPrimera_club: 0,
    },
    {
      nombre_club: "Deportes Iquique",
      ciudad_club: "Iquique",
      estadio_club: "Tierra de Campeones",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes/b3c4cf4f53d5078ec3e37b40135784ca.png",
      fechaFund_club: new Date("1999-05-21T00:00:00Z"),
      titulosPrimera_club: 0,
    },
    {
      nombre_club: "Everton",
      ciudad_club: "Viña del Mar, Valparaíso",
      estadio_club: "Sausalito",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes//97702ca6993f502b3478d7608963d392.png",
      fechaFund_club: new Date("1999-06-24T00:00:00Z"),
      titulosPrimera_club: 4,
    },
    {
      nombre_club: "Universidad de Chile",
      ciudad_club: "Santiago",
      estadio_club: "Nacional",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes/7fbceadc67d0639139019329cede98d7.png",
      fechaFund_club: new Date("1927-05-24T00:00:00Z"),
      titulosPrimera_club: 18,
    },
    {
      nombre_club: "Unión Española",
      ciudad_club: "Santiago",
      estadio_club: "Santa Laura",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes//a6e9009b32c6c2e399604e0c3841534b.png",
      fechaFund_club: new Date("1897-05-18T00:00:00Z"),
      titulosPrimera_club: 7,
    },
    {
      nombre_club: "Universidad Católica",
      ciudad_club: "Santiago",
      estadio_club: "San Carlos de Apoquindo",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes/d01105ee6df81f19d3d25c2736c7d6ae.png",
      fechaFund_club: new Date("1937-04-21T00:00:00Z"),
      titulosPrimera_club: 16,
    },
    {
      nombre_club: "Palestino",
      ciudad_club: "La Cisterna, Santiago",
      estadio_club: "Municipal de La Cisterna",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes/0af91335f25af3f423d2a802717b7a74.png",
      fechaFund_club: new Date("1920-08-20T00:00:00Z"),
      titulosPrimera_club: 2,
    },
    {
      nombre_club: "OHiggins",
      ciudad_club: "Rancagua",
      estadio_club: "El Teniente",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes//9c27509ed8b5acfedfea1cecbe0014d3.PNG",
      fechaFund_club: new Date("1955-04-07T00:00:00Z"),
      titulosPrimera_club: 1,
    },
    {
      nombre_club: "Ñublense",
      ciudad_club: "Chillán",
      estadio_club: "Municipal Nelson Oyarzún",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes/378cbcced037ab297f3809a87567f5e0.png",
      fechaFund_club: new Date("1916-08-20T00:00:00Z"),
      titulosPrimera_club: 0,
    },
    {
      nombre_club: "Unión La Calera",
      ciudad_club: "La Calera",
      estadio_club: "Municipal Nicolás Chahuán Nazar",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes/90123d347a2b296c2988e6aeeab06056.png",
      fechaFund_club: new Date("1954-01-26T00:00:00Z"),
      titulosPrimera_club: 0,
    },
    {
      nombre_club: "Huachipato",
      ciudad_club: "Talcahuano",
      estadio_club: "Huachipato-CAP Acero",
      escudo_club:
        "https://anfpfotos.cl/size/60x60/a/clubes//b93bf99aee062db5b3f7e71b8311387c.png",
      fechaFund_club: new Date("1947-06-07T00:00:00Z"),
      titulosPrimera_club: 3,
    },
  ];

  const entrenadores = [
    {
      nombre_entrenador: "Francisco",
      apellido_entrenador: "Arrué",
      nacionalidad_entrenador: "Chile",
      fechaNac_entrenador: new Date("1977-08-07T00:00:00Z"),
      clubId: 1,
    },
    {
      nombre_entrenador: "Dalcio",
      apellido_entrenador: "Giovagnoli",
      nacionalidad_entrenador: "Argentina",
      fechaNac_entrenador: new Date("1963-06-05T00:00:00Z"),
      clubId: 2,
    },
    {
      nombre_entrenador: "Gustavo",
      apellido_entrenador: "Huerta",
      nacionalidad_entrenador: "Chile",
      fechaNac_entrenador: new Date("1957-10-15T00:00:00Z"),
      clubId: 3,
    },
    {
      nombre_entrenador: "Jorge",
      apellido_entrenador: "Almirón",
      nacionalidad_entrenador: "Argentina",
      fechaNac_entrenador: new Date("1971-06-19T00:00:00Z"),
      clubId: 4,
    },
    {
      nombre_entrenador: "Fernando",
      apellido_entrenador: "Diaz",
      nacionalidad_entrenador: "Chile",
      fechaNac_entrenador: new Date("1961-12-27T00:00:00Z"),
      clubId: 5,
    },
    {
      nombre_entrenador: "Ivo",
      apellido_entrenador: "Basay",
      nacionalidad_entrenador: "Chile",
      fechaNac_entrenador: new Date("1966-04-13T00:00:00Z"),
      clubId: 6,
    },
    {
      nombre_entrenador: "Miguel",
      apellido_entrenador: "Ramírez",
      nacionalidad_entrenador: "Chile",
      fechaNac_entrenador: new Date("1978-05-21T00:00:00Z"),
      clubId: 7,
    },
    {
      nombre_entrenador: "Esteban",
      apellido_entrenador: "Solari",
      nacionalidad_entrenador: "Argentina",
      fechaNac_entrenador: new Date("1980-06-02T00:00:00Z"),
      clubId: 8,
    },
    {
      nombre_entrenador: "Gustavo",
      apellido_entrenador: "Álvarez",
      nacionalidad_entrenador: "Argentina",
      fechaNac_entrenador: new Date("1972-11-24T00:00:00Z"),
      clubId: 9,
    },
    {
      nombre_entrenador: "Miguel",
      apellido_entrenador: "Ponce",
      nacionalidad_entrenador: "Chile",
      fechaNac_entrenador: new Date("1971-08-19T00:00:00Z"),
      clubId: 10,
    },
    {
      nombre_entrenador: "Tiago",
      apellido_entrenador: "Nunes",
      nacionalidad_entrenador: "Brasil",
      fechaNac_entrenador: new Date("1980-01-15T00:00:00Z"),
      clubId: 11,
    },
    {
      nombre_entrenador: "Lucas",
      apellido_entrenador: "Bovaglio",
      nacionalidad_entrenador: "Argentina",
      fechaNac_entrenador: new Date("1979-04-19T00:00:00Z"),
      clubId: 12,
    },
    {
      nombre_entrenador: "Victor",
      apellido_entrenador: "Fuentes",
      nacionalidad_entrenador: "Chile",
      fechaNac_entrenador: new Date("1972-07-01T00:00:00Z"),
      clubId: 13,
    },
    {
      nombre_entrenador: "Mario",
      apellido_entrenador: "Salas",
      nacionalidad_entrenador: "Chile",
      fechaNac_entrenador: new Date("1967-10-11T00:00:00Z"),
      clubId: 14,
    },
    {
      nombre_entrenador: "Walter",
      apellido_entrenador: "Lemma",
      nacionalidad_entrenador: "Argentina",
      fechaNac_entrenador: new Date("1973-03-06T00:00:00Z"),
      clubId: 15,
    },
    {
      nombre_entrenador: "Igor",
      apellido_entrenador: "Oca",
      nacionalidad_entrenador: "España",
      fechaNac_entrenador: new Date("1981-05-07T00:00:00Z"),
      clubId: 16,
    },
  ];

  for (const arbitro of arbitros) {
    await prisma.arbitro.create({
      data: arbitro,
    });
  }

  for (const club of clubes) {
    await prisma.club.create({
      data: club,
    });
  }

  for (const entrenador of entrenadores) {
    await prisma.entrenador.create({
      data: entrenador,
    });
  }

  console.log("Datos insertados correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
