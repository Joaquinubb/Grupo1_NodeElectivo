# Chilean Premier League - Proyecto Grupo 1 - Node

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

1. GET: `localhost:4000/api/arbitros` devuelve todos los árbitros.

2. GET: `localhost:4000/api/clubes` devuelve todos los clubes.

3. GET: `localhost:4000/api/clubes/club?nombre=` devuelve los detalles de un club.

   Ejemplo: `localhost:4000/api/clubes/club?nombre=Ñublense`

4. POST: `localhost:4000/api/clubes` crea un club.

   Ejemplo: `localhost:4000/api/clubes?nombre_club=UBB&ciudad_club=Chillan&estadio_club=FM&fechaFund_club=2024-08-21&titulosPrimera_club=1&escudo_club=a.png`

5. PUT: `localhost:4000/api/clubes/update?id=` edita un club por su id.

   Ejemplo: `localhost:4000/api/clubes/update?id=17&ciudad_club=Chillan Viejo`

6. DELETE: `localhost:4000/api/clubes/delete?id=` elimina un club por su id.

7. GET: `localhost:4000/api/jugadores?apellido=` devuelve los jugadores por apellido.

   Ejemplo: `localhost:4000/api/jugadores?apellido=Vidal`

8. GET: `localhost:4000/api/jugadores/club?nombre=` devuelve los jugadores de un club.

   Ejemplo: `localhost:4000/api/jugadores/club?nombre=Ñublense`

9. POST: `localhost:4000/api/jugadores` crea un jugador.

   Ejemplo: `localhost:4000/api/jugadores/?nombre_jugador=Lionel&apellido_jugador=Messi&nacionalidad_jugador=Argentino&fechaNac_jugador=1986-06-24&posicion_jugador=DELANTERO&estatura_jugador=170&precio_jugador=0&club_jugador=Audax Italiano`

10. PUT: `localhost:4000/api/jugadores/update?id=` edita un jugador por su id.

    Ejemplo: `localhost:4000/api/jugadores/update?id=567&estatura_jugador=185`

11. DELETE: `localhost:4000/api/jugadores/delete?id=` elimina un jugador por id.

12. GET: `localhost:4000/api/entrenadores` devuelve todos los entrenadores.

13. GET: `localhost:4000/api/entrenadores/entrenador?apellido=` devuelve los detalles de un entrenador por apellido

    Ejemplo: `localhost:4000/api/entrenadores/entrenador?apellido=Almirón`

14. GET: `localhost:4000/api/partidos/` devuelve los partidos

15. POST: `localhost:4000/api/partidos?` crea un partido

    Ejemplo: `localhost:4000/api/partidos?fecha_partido=2024-09-26T14:00:00Z&idLocal_partido=1&idVisita_partido=2&idArbitro_partido=4`

16. DELETE: `localhost:4000/api/partidos` elimina un partido

    Ejemplo: `localhost:4000/api/partidos?id_partido=5`

17. PUT: `localhost:4000/api/partidos` edita un partido

    Ejemplo: `localhost:4000/api/partidos?id_partido=16&fecha_partido=2024-09-26T16:00:00Z`

18. POST: `localhost:4000/api/arbitros` crea un arbitro

    Ejemplo: `localhost:4000/api/arbitros?nombre_arbitro=mauro&apellido_arbitro=san&fechaNac_arbitro=2001-10-10T00:00:00Z`

19. DELETE: `localhost:4000/api/arbitros` elimina un arbitro

    Ejemplo: `localhost:4000/api/arbitros/47`

20. PUT: `localhost:4000/api/arbitros` edita un arbitro

    Ejemplo: `localhost:4000/api/arbitros/47?nombre_arbitro=mauro&apellido_arbitro=sanjuan&fechaNac_arbitro=2001-10-10T00:00:00Z`
