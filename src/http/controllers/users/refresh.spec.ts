import { it, describe, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import { app } from "@/app";

describe("Refresh Token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh token", async () => {
    await supertest(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    const authResponse = await supertest(app.server).post("/sessions").send({
      email: "john.doe@example.com",
      password: "123456",
    });

    const cookies = authResponse.get("Set-Cookie");

    if (!cookies) {
      throw new Error("Cookies not found");
    }

    const response = await supertest(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });

    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
