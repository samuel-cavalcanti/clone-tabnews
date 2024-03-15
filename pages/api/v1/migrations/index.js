import pgMigrate from "node-pg-migrate";
import { join } from "node:path";
import { NextApiRequest, NextApiResponse } from "next";


/**
 * @param {NextApiRequest} request 
 * @param {NextApiResponse} response 
 */
export default async function migrations(request, response) {

  if (request.method === "GET") {
    const migrations = await  dryRun();
    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await liveRun();
    return response.status(200).json(migrations);
  }

  response.status(405).end();
}

function dryRun() {
  const migrations = pgMigrate({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });

  return migrations;
}

function liveRun() {
  return pgMigrate({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: false,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });
}
