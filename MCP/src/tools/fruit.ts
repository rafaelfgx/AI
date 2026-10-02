import path from "path";
import sqlite3 from "sqlite3";
import { promisify } from "util";
import { z } from "zod";

const db = new sqlite3.Database(path.resolve(process.cwd(), "databases/fruits.db"));
const get = promisify(db.get).bind(db) as (sql: string, params: any[]) => Promise<any>;

export const fruit = {
    name: "fruit",
    config: {
        description: "Retrieve fruit from database by name",
        inputSchema: { name: z.string().nonempty().describe("Name of the fruit") }
    },
    handler: async ({ name }: { name: string }) => {
        const row = await get("SELECT * FROM fruits WHERE name = ? COLLATE NOCASE", [name]);
        return { content: [{ type: "text", text: row ? JSON.stringify(row) : `NotFound` }] };
    }
};
