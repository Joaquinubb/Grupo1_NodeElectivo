# Chilean Premier League - Proyecto Grupo 1 - Electivo Node - UBB

## Ejecutar en modo de Desarrollo

1. Crear archivo `.env` clonando `.env.template` y configurar las variables de entorno
2. Instalar dependencias `npm install`
3. Ejecutar `docker-compose up -d` para levantar la base de datos
4. Ejecutar el comando `npx prisma migrate dev`
5. Levantar con el comando `npm run dev`

## Poblar base de datos

1. Conectarse a la base de datos con el software `TablePlus` con los datos de las variables de entorno
2. Ir a realizar una consulta sql en la base de datos y pegar el contenido del archivo `CPL.sql`
3. Confirmar los cambios con `Run All`
