import { UserDTO, UserLoginDTO } from "../dtos/userDtos";
import { UnauthorizedError } from "../helpers/apiError";
import { userRepository } from "../repositories/userRepository";
import userService from "./userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  private secretKey: string;
  constructor() {
    this.secretKey = process.env.SECRET_KEY ?? "lajsdaj";
  }
  async login(payload: UserLoginDTO) {
    const user = await userService.getByEmail(payload.email);
    const isValidPassword = await bcrypt.compare(
      user.password,
      payload.password,
    );
    if (isValidPassword) {
      const token = jwt.sign(user.email, this.secretKey);
      return {
        user,
        token,
      };
    }
    throw new UnauthorizedError("Senha inválida.");
  }

  async register(payload: UserDTO) {
    try {
      // se o email não está registrado, então ocorre o erro.
      await userService.getByEmail(payload.email);
      return null;
    } catch (error) {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const userDto: UserDTO = {
        ...payload,
        password: hashedPassword,
      };
      const user = await userRepository.save(userDto);
      return user;
    }
  }
}
export default new AuthService();
