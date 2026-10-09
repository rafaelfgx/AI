import { DatabaseSync } from "node:sqlite";
import { z } from "zod";

const db = new DatabaseSync("databases/fruits.db");

export const fruit = {
    name: "fruit",
    config: {
        description: "Retrieve fruit from database by name",
        inputSchema: { name: z.string().nonempty().describe("Name of the fruit") }
    },
    handler: async ({ name }: { name: string }) => {
        const row = db.prepare("SELECT * FROM fruits WHERE name = ? COLLATE NOCASE").get(name);
        return { content: [{ type: "text", text: row ? JSON.stringify(row) : "NotFound" }] };
    }
};
