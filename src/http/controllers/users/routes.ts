import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {
  // Unauthenticated routes
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated routes
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
