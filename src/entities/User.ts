import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text", unique: true })
  phone: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text", nullable: true })
  profilePicture?: string;

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({ type: "text", nullable: true })
  cep?: string;
}
