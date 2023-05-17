export default () => ({
  datotest01: 'Dato de prueba 01',
  objetotest01: {
    datodentroobjeto: 'Dato interior objeto',
  },
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessExpirationTime: process.env.JWT_ACCESS_EXPIRATION_TIME || '600s',
  jwtDateExpirationTime: process.env.JWT_DATE_EXPIRATION_TIME || '600',
});
