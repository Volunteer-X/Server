
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLDateTime, GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars'

export interface CreateUserInput {
    username: string;
    email: EmailAddress;
    firstName: string;
    lastName: string;
    middleName?: Nullable<string>;
    picture?: Nullable<string>;
    picks: string[];
    latitude?: Nullable<number>;
    longitude?: Nullable<number>;
    device: string;
}

export interface UpdateUserInput {
    id: ObjectID;
    username?: Nullable<string>;
    email?: Nullable<EmailAddress>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    picks?: Nullable<string[]>;
    picture?: Nullable<string>;
    devices?: Nullable<string[]>;
    latitude?: Nullable<number>;
    longitude?: Nullable<number>;
}

export interface Name {
    firstName: string;
    middleName?: Nullable<string>;
    lastName: string;
}

export interface User {
    id: ObjectID;
    email: EmailAddress;
    username: string;
    name?: Nullable<Name>;
    picture?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    picks: string[];
    pings?: Nullable<Nullable<Ping>[]>;
    devices?: Nullable<string[]>;
}

export interface IQuery {
    getUser(id: ObjectID): User | Promise<User>;
    getUserByEmail(email: EmailAddress): Nullable<User> | Promise<Nullable<User>>;
    isUsernameAvailable(username: string): boolean | Promise<boolean>;
}

export interface Ping {
    id: ObjectID;
    user?: Nullable<User>;
}

export interface IMutation {
    createUser(payload: CreateUserInput): User | Promise<User>;
    updateUser(payload: UpdateUserInput): User | Promise<User>;
    removeUser(id: ObjectID): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = typeof GraphQLDateTime;
export type EmailAddress = typeof GraphQLEmailAddress;
export type ObjectID = typeof GraphQLObjectID;
type Nullable<T> = T | null;
