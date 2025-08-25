import { neon } from "@neondatabase/serverless";
import { DatabaseConfig } from "./envs";

export const DB = neon(await DatabaseConfig.db_api());
