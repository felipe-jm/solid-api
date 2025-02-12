import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJwt } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  // Unauthenticated routes
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated routes
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
