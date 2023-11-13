
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLDateTime, GraphQLObjectID, GraphQLLatitude, GraphQLLongitude, GraphQLURL } from 'graphql-scalars'

export interface CreatePingInput {
    title: string;
    description?: Nullable<string>;
    mediaIDs?: Nullable<Nullable<string>[]>;
    userID: ObjectID;
    longitude: Longitude;
    latitude: Latitude;
    url?: Nullable<URL>;
    picks: string[];
}

export interface Ping {
    id: ObjectID;
    title: string;
    description?: Nullable<string>;
    userID: ObjectID;
    longitude: Longitude;
    latitude: Latitude;
    url?: Nullable<URL>;
    createdAt?: Nullable<DateTime>;
    picks: string[];
}

export interface IMutation {
    createPing(createPingInput: CreatePingInput): Ping | Promise<Ping>;
}

export type ObjectID = typeof GraphQLObjectID;
export type Longitude = typeof GraphQLLongitude;
export type Latitude = typeof GraphQLLatitude;
export type URL = typeof GraphQLURL;
export type DateTime = typeof GraphQLDateTime;
type Nullable<T> = T | null;
