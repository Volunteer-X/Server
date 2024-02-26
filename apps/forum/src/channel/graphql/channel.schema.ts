
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLObjectID } from 'graphql-scalars'

export interface BaseError {
    message: string;
}

export class Channel {
    id: ObjectID;
    activityID: ObjectID;
    ping: Ping;
    title: string;
    admin: User;
    participants: User[];
}

export abstract class IQuery {
    abstract channel(id: ObjectID): Nullable<ChannelPayload> | Promise<Nullable<ChannelPayload>>;

    abstract adminChannels(admin: ObjectID): ChannelPayload[] | Promise<ChannelPayload[]>;

    abstract userChannels(user: ObjectID): ChannelPayload[] | Promise<ChannelPayload[]>;
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
}

export class User {
    id: ObjectID;
}

export type ObjectID = typeof GraphQLObjectID;
export type ChannelPayload = Channel | NotFoundError | UnknownError | UnauthorizedError | InternalServerError;
type Nullable<T> = T | null;
