/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import {
  GraphQLDateTime,
  GraphQLEmailAddress,
  GraphQLLatitude,
  GraphQLLongitude,
  GraphQLObjectID,
} from 'graphql-scalars';

export class CreateUserInput {
  username: string;
  email: EmailAddress;
  firstName: string;
  lastName: string;
  middleName?: Nullable<string>;
  picture?: Nullable<string>;
  picks: string[];
  latitude?: Nullable<Latitude>;
  longitude?: Nullable<Longitude>;
  device: string;
}

export class UpdateUserInput {
  id: ObjectID;
  username?: Nullable<string>;
  email?: Nullable<EmailAddress>;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  middleName?: Nullable<string>;
  picks?: Nullable<string[]>;
  picture?: Nullable<string>;
  devices?: Nullable<string[]>;
  latitude?: Nullable<Latitude>;
  longitude?: Nullable<Longitude>;
}

export interface BaseError {
  message: string;
}

export class Name {
  firstName: string;
  middleName?: Nullable<string>;
  lastName: string;
}

export class User {
  id: ObjectID;
  email: EmailAddress;
  username: string;
  name?: Nullable<Name>;
  picture?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  picks: string[];
  pings?: Nullable<Nullable<Ping>[]>;
  activityCount?: Nullable<number>;
  devices?: Nullable<string[]>;
}

export abstract class IQuery {
  abstract user(): UserPayload | Promise<UserPayload>;

  abstract userById(id: ObjectID): User | Promise<User>;

  abstract isUsernameAvailable(username: string): boolean | Promise<boolean>;
}

export class InvalidInputError implements BaseError {
  message: string;
}

export class NotFoundError implements BaseError {
  message: string;
}

export class UnauthorizedError implements BaseError {
  message: string;
}

export class ForbiddenError implements BaseError {
  message: string;
}

export class InternalServerError implements BaseError {
  message: string;
}

export class UnknownError implements BaseError {
  message: string;
}

export class Ping {
  id: ObjectID;
  user?: Nullable<User>;
}

export abstract class IMutation {
  abstract createUser(payload: CreateUserInput): User | Promise<User>;

  abstract updateUser(payload: UpdateUserInput): User | Promise<User>;

  abstract removeUser(id: ObjectID): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = typeof GraphQLDateTime;
export type EmailAddress = typeof GraphQLEmailAddress;
export type ObjectID = typeof GraphQLObjectID;
export type Longitude = typeof GraphQLLongitude;
export type Latitude = typeof GraphQLLatitude;
export type UserPayload =
  | User
  | NotFoundError
  | UnauthorizedError
  | UnknownError
  | InternalServerError;
type Nullable<T> = T | null;
