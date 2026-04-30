import { z } from "zod";

export const ai = {
    name: "ai",
    config: {
        description: "AI",
        inputSchema: {
            provider: z.enum(["GPT", "Gemini"]),
            prompt: z.string().nonempty()
        }
    },
    handler: async ({ provider, prompt }: { provider: string, prompt: string }) => {
        return {
            content: [{ type: "text", text: provider + " " + prompt }]
        };
    }
};
