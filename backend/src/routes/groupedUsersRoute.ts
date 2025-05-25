import { FastifyInstance } from "fastify";
import { getGroupedUserSummary } from "../services/userSummaryService";

export async function groupedUsersRoute(fastify: FastifyInstance) {
  let cachedData: any = null;
  let cacheTime = 0;

  fastify.get("/grouped-users", async (_, reply) => {
    try {
      const now = Date.now();
      if (cachedData && now - cacheTime < 60_000) {
        return reply.send(cachedData);
      }

      const summary = await getGroupedUserSummary();
      cachedData = summary;
      cacheTime = now;
      reply.send(summary);
    } catch {
      reply.status(500).send({ error: "Failed to fetch user data" });
    }
  });
}
