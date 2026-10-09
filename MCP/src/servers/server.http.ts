import { createServer } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { ai } from "../tools/ai.js";
import { fruit } from "../tools/fruit.js";
import { hello } from "../tools/hello.js";
import { user } from "../tools/user.js";

const tools = [ai, fruit, hello, user];

export const httpServer = createServer(async (request, response) => {
    const server = new McpServer({ name: "Server", version: "1.0.0" });
    tools.forEach(tool => server.registerTool(tool.name, tool.config as any, tool.handler as any));
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    response.on("close", () => { transport.close(); server.close(); });
    await server.connect(transport);
    await transport.handleRequest(request, response);
});

await new Promise<void>(resolve => { httpServer.listen(3000, resolve); });
