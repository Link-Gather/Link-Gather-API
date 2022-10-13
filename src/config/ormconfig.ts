const mysqlConfig = {
  type: 'mysql',
  host: { $env: 'DB_HOST' },
  port: { $env: 'DB_PORT' },
  database: { $env: 'DB_NAME' },
  username: { $env: 'DB_USER' },
  password: { $env: 'DB_PASSWORD' },
};

export default {
  ...mysqlConfig,
  synchronize: false,
  logging: true,
  // migrations: ['src/migration/**/*.ts'],
  supportBigNumbers: true,
  bigNumberStrings: false,
};
