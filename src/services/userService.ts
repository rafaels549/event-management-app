import { UserDTO } from "../dtos/userDtos";
import { NotFoundError } from "../helpers/apiError";
import { userRepository } from "../repositories/userRepository";

class UserService {
  async getById(id: string) {
    const user = await userRepository.findOneBy({
      id: id,
    });
    if (user === null) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await userRepository.findOneBy({
      email: email,
    });

    if (user === null) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    return user;
  }

  async getAll({
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
      queryBuilder.where(
        "users.name LIKE :searchTerm OR users.email LIKE :searchTerm",
        {
          searchTerm: `%${q}%`,
        },
      );
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
  async update(payload: UserDTO, userId: string) {
    const user = await this.getById(userId);
    // não sei se funciona
    userRepository.merge(user, payload);
    const updatedUser = await userRepository.save(user);
    return updatedUser;
  }

  async delete(userId: string) {
    const user = await this.getById(userId);
    await userRepository.remove(user);
  }
}

export default new UserService();
