import Fastify from "fastify";
import { groupedUsersRoute } from "./routes/groupedUsersRoute";

const fastify = Fastify({ logger: true });

fastify.register(groupedUsersRoute);

// Start server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 Server listening at ${address}`);
});

export default fastify;
