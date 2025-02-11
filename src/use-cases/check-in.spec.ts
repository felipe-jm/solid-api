import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcryptjs from "bcryptjs";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let usersRepository: InMemoryUsersRepository;
let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("should be able to check in", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await bcryptjs.hash("123456", 6),
    });

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: user.id,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
