import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({ name: "client", version: "1.0.0" });
await client.connect(new StdioClientTransport({ command: "npx", args: ["tsx", "--env-file=.env", "src/servers/server.ts"] }));
console.log(await client.listTools());
console.log(await client.callTool({ name: "ai", arguments: { provider: "GPT", prompt: "Prompt" } }));
console.log(await client.callTool({ name: "fruit", arguments: { name: "apple" } }));
console.log(await client.callTool({ name: "hello" }));
console.log(await client.callTool({ name: "user", arguments: { id: 1 } }));
await client.close();
