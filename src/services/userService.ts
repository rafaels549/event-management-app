import { userRepository } from "../repositories/userRepository";

class UserService {
  async login() {}
  async register() {}
  async getAllUsers({
    q,
    page = 1,
    size = 10,
  }: {
    q?: string;
    page?: number;
    size?: number;
  }) {
    const queryBuilder = userRepository.createQueryBuilder("users");
    if (q) {
      queryBuilder.where("users.name LIKE :searchTerm", {
        searchTerm: `%${q}%`,
      });
    }
    queryBuilder.skip((page - 1) * size).take(size);
    const [users, total] = await queryBuilder.getManyAndCount();
    return {
      data: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / size),
    };
  }
}

export default new UserService();
