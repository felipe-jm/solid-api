import { it, describe, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create Check-In (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        name: "JavaScript Gym",
        description: "Some description.",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    const response = await supertest(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
