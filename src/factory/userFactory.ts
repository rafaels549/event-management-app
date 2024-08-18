import { User } from "../entities/User";
import { faker } from "@faker-js/faker";

export const userFactory = (n: number): User[] => {
  const users: User[] = [];
  for (let index = 0; index < n; index++) {
    const user = new User();
    user.id = faker.string.uuid();
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.phone = faker.phone.number();
    user.password = faker.internet.password();
    user.profilePicture = faker.image.avatar();
    user.birthDate = faker.date.birthdate();
    user.bio = faker.lorem.sentence();
    user.address = faker.location.streetAddress();
    user.cep = faker.location.zipCode();
    users.push(user);
  }
  return users;
};
