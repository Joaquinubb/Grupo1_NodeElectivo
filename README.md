# Chilean Premier League - Proyecto Grupo 1 - Electivo Node - UBB

## Ejecutar en modo de Desarrollo

1. Crear archivo `.env` clonando `.env.template` y configurar las variables de entorno.
2. Instalar dependencias `npm install`.
3. Ejecutar `docker-compose up -d` para levantar la base de datos.
4. Ejecutar el comando `npx prisma migrate dev`.
5. Levantar con el comando `npm run dev`.

## Poblar base de datos

1. Ejecutar el comando `npm run seed` para poblar la base de datos.
2. Conectarse a la base de datos con el software de su preferencia, se recomienda `TablePlus` por su simpleza.
3. Para la conexión, utilizar los datos de las variables de entorno.
4. Verificar los campos creados en cada tabla.
