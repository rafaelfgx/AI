import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ai } from "../tools/ai.js";
import { fruit } from "../tools/fruit.js";
import { hello } from "../tools/hello.js";
import { user } from "../tools/user.js";

const server = new McpServer({ name: "Server", version: "1.0.0" });
const tools = [ai, fruit, hello, user];
tools.forEach(tool => server.registerTool(tool.name, tool.config as any, tool.handler as any));
await server.connect(new StdioServerTransport());
