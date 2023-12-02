
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLDateTime, GraphQLObjectID, GraphQLLatitude, GraphQLLongitude, GraphQLURL } from 'graphql-scalars'

export interface CreatePingInput {
    userID: ObjectID;
    title: string;
    picks: string[];
    longitude: Longitude;
    latitude: Latitude;
    description?: Nullable<string>;
    url?: Nullable<URL>;
    radius?: Nullable<number>;
}

export interface Ping {
    id: string;
    title: string;
    userID: ObjectID;
    longitude: Longitude;
    latitude: Latitude;
    picks: string[];
    description?: Nullable<string>;
    url?: Nullable<URL>;
    radius?: Nullable<number>;
    createdAt?: Nullable<DateTime>;
    media?: Nullable<Nullable<Media>[]>;
}

export interface Media {
    Key: string;
    type: string;
}

export interface IMutation {
    createPing(createPingInput: CreatePingInput): Ping | Promise<Ping>;
    updateMedia(pingID: string, media: Media[]): Ping | Promise<Ping>;
}

export type ObjectID = typeof GraphQLObjectID;
export type Longitude = typeof GraphQLLongitude;
export type Latitude = typeof GraphQLLatitude;
export type URL = typeof GraphQLURL;
export type DateTime = typeof GraphQLDateTime;
type Nullable<T> = T | null;
