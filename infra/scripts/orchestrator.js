import retry from "async-retry";
import database from "infra/database.js";
import { runMigrations } from "models/migrator";

async function fetchStatus() {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/v1/status`);
  if (response.status !== 200)
    throw Error(`${response.status}\n${response.statusText}`);
}

const clearDB = () =>
  database.query("drop schema public cascade; create schema public;");

async function waitServices() {
  const retryParams = {
    retries: 100,
    factor: 1,
    maxTimeout: 1_000,
  };
  await retry(fetchStatus, retryParams);
}
const waitMigrations = () => runMigrations(false);

module.exports = {
  clearDB,
  waitServices,
  waitMigrations,
};
