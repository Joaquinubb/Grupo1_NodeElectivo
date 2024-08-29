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

1. GET: *`localhost:3000/api/arbitros`* obtiene todos los árbitros.
2. GET: `localhost:3000/api/clubes` obtiene todos los clubes.
3. GET: `localhost:3000/api/clubes/club?nombre=` obtiene un club por nombre.
4. POST: `localhost:3000/api/clubes` crea un club.
   Ejemplo: localhost:3000/api/clubes?nombre_club=UBB&ciudad_club=Chillan&estadio_club=FM&fechaFund_club=2024-08-21&titulosPrimera_club=1&escudo_club=a.png
5. PUT: `localhost:3000/api/clubes?id=` edita un club.
   Ejemplo: `localhost:3000/api/clubes?id=1&ciudad_club=Chillan&estadio_club=FM&fechaFund_club=2024-08-21`
6. DELETE: `localhost:3000/api/clubes/id` elimina un club OJO ARREGLAR.
7. GET: `localhost:3000/api/jugadores?apellido=` obtiene los jugadores por apellido.
8. GET: `localhost:3000/api/jugadores/club?nombre=` obtiene los jugadores de un club por nombre.
9. POST: `localhost:3000/api/jugadores` crea un jugador.
    Ejemplo: `localhost:3000/api/jugadores/?nombre_jugador=Lionel&apellido_jugador=Messi&nacionalidad_jugador=Argentino&fechaNac_jugador=1986-06-24&posicion_jugador=DELANTERO&estatura_jugador=170&precio_jugador=0&club_jugador=Audax Italiano`
10. PUT: `localhost:3000/api/jugadores` edita un jugador.
    Ejemplo: `localhost:3000/api/jugadores/update?id_jugador=1&estatura_jugador=185` 
11. DELETE: `localhost:3000/api/jugadores/delete?id=` elimina un jugador por id.
12. GET: `localhost:3000/api/entrenadores` obtiene todos los entrenadores.
13. GET: `localhost:3000/api/entrenadores/id` obtiene un entrenador por id OJO ARREGLAR.




