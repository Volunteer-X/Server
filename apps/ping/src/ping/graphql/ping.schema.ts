
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLDateTime, GraphQLObjectID, GraphQLLatitude, GraphQLLongitude, GraphQLURL } from 'graphql-scalars'

export interface CreatePingInput {
    userID: string;
    title: string;
    picks: string[];
    longitude: Longitude;
    latitude: Latitude;
    description?: Nullable<string>;
    url?: Nullable<URL>;
    radius?: Nullable<number>;
}

export interface UpdatePingInput {
    id: string;
    title?: Nullable<string>;
    picks?: Nullable<string[]>;
    longitude?: Nullable<Longitude>;
    latitude?: Nullable<Latitude>;
    description?: Nullable<string>;
    url?: Nullable<URL>;
    radius?: Nullable<number>;
    media?: Nullable<Nullable<MediaInput>[]>;
}

export interface MediaInput {
    key: string;
    type: string;
}

export interface Media {
    key: string;
    type: string;
}

export interface Ping {
    id: string;
    title: string;
    userID: string;
    longitude: Longitude;
    latitude: Latitude;
    picks: string[];
    description?: Nullable<string>;
    url?: Nullable<URL>;
    radius?: Nullable<number>;
    createdAt?: Nullable<DateTime>;
    media?: Nullable<Nullable<Media>[]>;
}

export interface IMutation {
    createPing(createPingInput: CreatePingInput): string | Promise<string>;
    updatePing(updatePingInput: UpdatePingInput): string | Promise<string>;
}

export type ObjectID = typeof GraphQLObjectID;
export type Longitude = typeof GraphQLLongitude;
export type Latitude = typeof GraphQLLatitude;
export type URL = typeof GraphQLURL;
export type DateTime = typeof GraphQLDateTime;
type Nullable<T> = T | null;
