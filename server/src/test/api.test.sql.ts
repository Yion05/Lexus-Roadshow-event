import { DB_CONFIG } from "../service/database";

await new DB_CONFIG().getJSON();
await new DB_CONFIG().getCSV();
await new DB_CONFIG().readData();
await new DB_CONFIG().getPaginatedData(1, 10);