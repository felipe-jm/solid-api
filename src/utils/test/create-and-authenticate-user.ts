import supertest from "supertest";

import { FastifyInstance } from "fastify";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await supertest(app.server).post("/users").send({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "123456",
  });

  const authResponse = await supertest(app.server).post("/sessions").send({
    email: "john.doe@example.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
