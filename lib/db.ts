import postgres from "postgres";

let client: ReturnType<typeof postgres> | undefined;

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function db() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_NOT_CONFIGURED");
  }

  client ??= postgres(process.env.DATABASE_URL, {
    max: 2,
    idle_timeout: 10,
    connect_timeout: 8,
    prepare: false,
  });

  return client;
}
