import { it, describe, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search for gyms by name", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await supertest(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "JavaScript Gym",
        description: "Some description.",
        phone: "11999999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    await supertest(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "TypeScript Gym",
        description: "Some description.",
        phone: "11999999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    const response = await supertest(app.server)
      .get("/gyms/search")
      .query({
        q: "JavaScript",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: "JavaScript Gym",
      }),
    ]);
  });
});
