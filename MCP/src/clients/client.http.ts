import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { httpServer } from "../servers/server.http.js";

const client = new Client({ name: "client", version: "1.0.0" });
await client.connect(new StreamableHTTPClientTransport(new URL("http://localhost:3000/mcp")));
console.log(await client.listTools());
console.log(await client.callTool({ name: "ai", arguments: { provider: "GPT", prompt: "Prompt" } }));
console.log(await client.callTool({ name: "fruit", arguments: { name: "apple" } }));
console.log(await client.callTool({ name: "hello" }));
console.log(await client.callTool({ name: "user", arguments: { id: 1 } }));
await client.close();
httpServer.close();
httpServer.closeAllConnections();
