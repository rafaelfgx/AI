import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ai } from "../tools/ai.js";
import { fruit } from "../tools/fruit.js";
import { hello } from "../tools/hello.js";
import { user } from "../tools/user.js";

const server = new McpServer({ name: "Server", version: "1.0.0" });

server.registerTool(ai.name, ai.config, ai.handler);
server.registerTool(fruit.name, fruit.config, fruit.handler);
server.registerTool(hello.name, hello.config, hello.handler);
server.registerTool(user.name, user.config, user.handler);

async function run() {
    await server.connect(new StdioServerTransport());
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
