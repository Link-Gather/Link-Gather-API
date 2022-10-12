const mysqlConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export default {
  ...mysqlConfig,
  // synchronize: true,
  // dropSchema: true,
  logging: true,
  migrations: ['src/migration/**/*.ts'],
  supportBigNumbers: true,
  bigNumberStrings: false,
};
