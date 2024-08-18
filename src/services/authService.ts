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
      payload.password,
      user.password,
    );
    if (isValidPassword) {
      const token = jwt.sign({ email: user.email }, this.secretKey);
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
      const salts = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salts);
      const userDto: UserDTO = {
        ...payload,
        password: hashedPassword,
      };
      console.log(userDto);
      const user = await userRepository.save(userDto);
      return user;
    }
  }
}
export default new AuthService();
