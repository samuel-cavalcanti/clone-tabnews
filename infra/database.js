import { Client } from "pg";

const query = (query) => withClient((client) => client.query(query));

async function settings() {
  const sql = `
SELECT current_setting('server_version') as version,
       current_setting('max_connections')::integer as max_conn,
       count(*)::int as n_conn
FROM pg_stat_activity
WHERE
     datname = '${process.env.POSTGRES_DB}'
;
  `;
  const sqlResult = await query(sql);
  const ps_settings = sqlResult.rows[0];

  return {
    version: ps_settings.version,
    maxConnections: ps_settings.max_conn,
    numberOfConnections: ps_settings.n_conn,
  };
}

async function withClient(func) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  });
  try {
    await client.connect();
    return await func(client);
  } catch (error) {
    console.error("PostgresSQL error", error);
    throw error;
  } finally {
    await client.end();
  }
}

const database = {
  query,
  settings,
  withClient,
};

export default database;
