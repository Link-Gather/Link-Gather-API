import { customAlphabet } from 'nanoid';
import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export type UserCtorType = { name: string; password: string; email: string };

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 15);
@ObjectType()
@Entity()
export class User {
  @Field((type) => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  password!: string;

  private constructor(args: UserCtorType) {
    if (args) {
      this.id = nanoid();
      this.email = args.email;
      this.name = args.name;
      this.password = args.password;
    }
  }

  static of(args: UserCtorType) {
    return new User(args);
  }
}
