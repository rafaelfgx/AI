import { z } from "zod";

export const user = {
    name: "user",
    config: {
        description: "Retrieve user from API by id",
        inputSchema: {
            id: z.number().nonnegative().min(1)
        }
    },
    handler: async ({ id }: { id: number }) => {
        const response = await (await fetch(`${process.env["JSONPLACEHOLDER_URL"]}/users/${id}`)).json();

        return {
            content: [{ type: "text", text: JSON.stringify(response) }]
        };
    }
};
