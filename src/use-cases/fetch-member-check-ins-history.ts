import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchMemberCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchMemberCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchMemberCheckInsHistoryUseCaseRequest): Promise<FetchMemberCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
