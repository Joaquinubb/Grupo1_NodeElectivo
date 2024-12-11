# Chilean Premier League 2024 - Proyecto Grupo 1 - Node

## Preparación Inicial

1. Crear archivo `.env` clonando `.env.template` y configurar las variables de entorno.
2. Instalar dependencias con `npm install`.
3. Tener `Docker` en ejecución y ejecutar el comando `docker-compose up -d` para levantar la base de datos.
4. Esperar unos segundos para que la BD esté correctamente en ejecución antes de realizar el siguiente paso.
5. Ejecutar el comando `npm run seed` para migrar el esquema de prisma a la base de datos y poblarla.

## Verificar Base de Datos

1. Conectarse a la base de datos con el software de su preferencia, se recomienda `TablePlus` por su simpleza.
2. Para la conexión, utilizar los datos de las variables de entorno.
3. Verificar los campos creados en cada tabla.

## Ejecutar en modo de Desarrollo

1. Ejecutar el comando `npm run dev`.

## Endpoints funcionales

1.  GET: `localhost:4000/api/arbitros` devuelve todos los árbitros.

2.  GET: `localhost:4000/api/clubes` devuelve todos los clubes.

3.  GET: `localhost:4000/api/clubes/club` devuelve los detalles de un club.

        localhost:4000/api/clubes/club?nombre=Ñublense

4.  POST: `localhost:4000/api/clubes` crea un club.

        localhost:4000/api/clubes?nombre_club=UBB&ciudad_club=Chillan&estadio_club=FM&fechaFund_club=2024-08-21T00:00:00Z&titulosPrimera_club=1&escudo_club=https://www.ubiobio.cl/mcc/images/logosimbologia.png

5.  PUT: `localhost:4000/api/clubes/update` edita un club por su id.

        localhost:4000/api/clubes/update?id=17&ciudad_club=Chillan Viejo&escudo_club=https://www.ubiobio.cl/mcc/images/logosimbologia.png&estadio_club=Fernando May&fechaFund_club=2024-08-22T00:00:00Z&titulosPrimera_club=1

6.  DELETE: `localhost:4000/api/clubes/delete` elimina un club por su id.

        localhost:4000/api/clubes/delete?id=17

7.  GET: `localhost:4000/api/jugadores` devuelve los jugadores y busca por apellido.

        localhost:4000/api/jugadores?apellido=Vidal

8.  GET: `localhost:4000/api/jugadores/club` devuelve los jugadores de un club.

        localhost:4000/api/jugadores/club?nombre=Ñublense

9.  POST: `localhost:4000/api/jugadores` crea un jugador.

        localhost:4000/api/jugadores?nombre_jugador=Lionel&apellido_jugador=Messi&nacionalidad_jugador=Argentina&fechaNac_jugador=1986-06-24T00:00:00Z&posicion_jugador=delantero&estatura_jugador=170&precio_jugador=0&club_jugador=Palestino

10. PUT: `localhost:4000/api/jugadores/update` edita un jugador por su id.

        localhost:4000/api/jugadores/update?id=568&estatura_jugador=170&posicion_jugador=delantero&precio_jugador=0&club_jugador=Colo Colo&nombre_jugador=Lionel&apellido_jugador=Messi&nacionalidad_jugador=Argentina&fechaNac_jugador=2024-09-25T17:21:00Z

11. DELETE: `localhost:4000/api/jugadores/delete` elimina un jugador por id.

        localhost:4000/api/jugadores/delete?id=567

12. GET: `localhost:4000/api/entrenadores` devuelve todos los entrenadores.

13. GET: `localhost:4000/api/entrenadores/entrenador` devuelve los detalles de un entrenador por apellido

        localhost:4000/api/entrenadores/entrenador?apellido=Almirón

14. GET: `localhost:4000/api/partidos` devuelve todos los partidos

15. POST: `localhost:4000/api/partidos` crea un partido

        localhost:4000/api/partidos?fecha_partido=2024-09-26T14:00:00Z&idLocal_partido=1&idVisita_partido=2&idArbitro_partido=4

16. PUT: `localhost:4000/api/partidos` edita un partido

        localhost:4000/api/partidos?id_partido=5&fecha_partido=2024-09-26T16:00:00Z&idArbitro_partido=5

17. DELETE: `localhost:4000/api/partidos` elimina un partido

        localhost:4000/api/partidos?id_partido=5

18. POST: `localhost:4000/api/arbitros` crea un arbitro

        localhost:4000/api/arbitros?nombre_arbitro=mauro&apellido_arbitro=san&fechaNac_arbitro=2001-10-10T00:00:00Z

19. PUT: `localhost:4000/api/arbitros` edita un arbitro

        localhost:4000/api/arbitros/47?nombre_arbitro=mauro&apellido_arbitro=sanjuan&fechaNac_arbitro=2001-10-10T00:00:00Z

20. DELETE: `localhost:4000/api/arbitros` elimina un arbitro

        localhost:4000/api/arbitros/47

## Endpoints funcionales producción

1.  GET: `pacheco.chillan.ubiobio.cl:3035/api/arbitros` devuelve todos los árbitros.

2.  GET: `pacheco.chillan.ubiobio.cl:3035/api/clubes` devuelve todos los clubes.

3.  GET: `pacheco.chillan.ubiobio.cl:3035/api/clubes/club` devuelve los detalles de un club.

        pacheco.chillan.ubiobio.cl:3035/api/clubes/club?nombre=Ñublense

4.  POST: `pacheco.chillan.ubiobio.cl:3035/api/clubes` crea un club.

        pacheco.chillan.ubiobio.cl:3035/api/clubes?nombre_club=UBB&ciudad_club=Chillan&estadio_club=FM&fechaFund_club=2024-08-21T00:00:00Z&titulosPrimera_club=1&escudo_club=https://www.ubiobio.cl/mcc/images/logosimbologia.png

5.  PUT: `pacheco.chillan.ubiobio.cl:3035/api/clubes/update` edita un club por su id.

        pacheco.chillan.ubiobio.cl:3035/api/clubes/update?id=17&ciudad_club=Chillan Viejo&escudo_club=https://www.ubiobio.cl/mcc/images/logosimbologia.png&estadio_club=Fernando May&fechaFund_club=2024-08-22T00:00:00Z&titulosPrimera_club=1

6.  DELETE: `pacheco.chillan.ubiobio.cl:3035/api/clubes/delete` elimina un club por su id.

        pacheco.chillan.ubiobio.cl:3035/api/clubes/delete?id=17

7.  GET: `pacheco.chillan.ubiobio.cl:3035/api/jugadores` devuelve los jugadores y busca por apellido.

        pacheco.chillan.ubiobio.cl:3035/api/jugadores?apellido=Vidal

8.  GET: `pacheco.chillan.ubiobio.cl:3035/api/jugadores/club` devuelve los jugadores de un club.

        pacheco.chillan.ubiobio.cl:3035/api/jugadores/club?nombre=Ñublense

9.  POST: `pacheco.chillan.ubiobio.cl:3035/api/jugadores` crea un jugador.

        pacheco.chillan.ubiobio.cl:3035/api/jugadores?nombre_jugador=Lionel&apellido_jugador=Messi&nacionalidad_jugador=Argentina&fechaNac_jugador=1986-06-24T00:00:00Z&posicion_jugador=delantero&estatura_jugador=170&precio_jugador=0&club_jugador=Palestino

10. PUT: `pacheco.chillan.ubiobio.cl:3035/api/jugadores/update` edita un jugador por su id.

        pacheco.chillan.ubiobio.cl:3035/api/jugadores/update?id=568&estatura_jugador=170&posicion_jugador=delantero&precio_jugador=0&club_jugador=Colo Colo&nombre_jugador=Lionel&apellido_jugador=Messi&nacionalidad_jugador=Argentina&fechaNac_jugador=2024-09-25T17:21:00Z

11. DELETE: `pacheco.chillan.ubiobio.cl:3035/api/jugadores/delete` elimina un jugador por id.

        pacheco.chillan.ubiobio.cl:3035/api/jugadores/delete?id=567

12. GET: `pacheco.chillan.ubiobio.cl:3035/api/entrenadores` devuelve todos los entrenadores.

13. GET: `pacheco.chillan.ubiobio.cl:3035/api/entrenadores/entrenador` devuelve los detalles de un entrenador por apellido

        pacheco.chillan.ubiobio.cl:3035/api/entrenadores/entrenador?apellido=Almirón

14. GET: `pacheco.chillan.ubiobio.cl:3035/api/partidos` devuelve todos los partidos

15. POST: `pacheco.chillan.ubiobio.cl:3035/api/partidos` crea un partido

        pacheco.chillan.ubiobio.cl:3035/api/partidos?fecha_partido=2024-09-26T14:00:00Z&idLocal_partido=1&idVisita_partido=2&idArbitro_partido=4

16. PUT: `pacheco.chillan.ubiobio.cl:3035/api/partidos` edita un partido

        pacheco.chillan.ubiobio.cl:3035/api/partidos?id_partido=5&fecha_partido=2024-09-26T16:00:00Z&idArbitro_partido=5

17. DELETE: `pacheco.chillan.ubiobio.cl:3035/api/partidos` elimina un partido

        pacheco.chillan.ubiobio.cl:3035/api/partidos?id_partido=5

18. POST: `pacheco.chillan.ubiobio.cl:3035/api/arbitros` crea un arbitro

        pacheco.chillan.ubiobio.cl:3035/api/arbitros?nombre_arbitro=mauro&apellido_arbitro=san&fechaNac_arbitro=2001-10-10T00:00:00Z

19. PUT: `pacheco.chillan.ubiobio.cl:3035/api/arbitros` edita un arbitro

        pacheco.chillan.ubiobio.cl:3035/api/arbitros/47?nombre_arbitro=mauro&apellido_arbitro=sanjuan&fechaNac_arbitro=2001-10-10T00:00:00Z

20. DELETE: `pacheco.chillan.ubiobio.cl:3035/api/arbitros` elimina un arbitro

        pacheco.chillan.ubiobio.cl:3035/api/arbitros/47
