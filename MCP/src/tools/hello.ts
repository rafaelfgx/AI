export const hello = {
    name: "hello",
    config: {
        description: "Hello"
    },
    handler: async () => ({
        content: [{ type: "text" as const, text: "Hello!" }]
    })
};
