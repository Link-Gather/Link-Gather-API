import { Aggregate } from '../../../lib/ddd';
import { customAlphabet } from 'nanoid';
import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

export const providedByType = <const>['kakao', 'local'];
export type ProvidedByType = typeof providedByType[number];

export type UserCtorType = {
  name: string;
  password: string;
  email: string;
  providedBy: ProvidedByType;
};

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 15);
@ObjectType()
@Entity()
export class User extends Aggregate<User> {
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

  @Field()
  @Column()
  providedBy!: ProvidedByType;

  private constructor(args: UserCtorType) {
    super();
    if (args) {
      this.id = nanoid();
      this.email = args.email;
      this.name = args.name;
      this.password = args.password;
      this.providedBy = args.providedBy ?? 'local';
    }
  }

  static of(args: UserCtorType) {
    return new User(args);
  }
}
