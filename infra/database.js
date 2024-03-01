import { Client } from "pg";

async function query(query) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    daatabase: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();

    const result = await client.query(query);

    await client.end();

    return result;
  } catch (error) {
    console.error("PostgresSQL error", error);
    throw error;
  } finally {
    await client.end();
  }
}

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

export default {
  query: query,
  settings: settings,
};
