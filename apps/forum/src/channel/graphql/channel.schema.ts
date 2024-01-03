/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLObjectID } from 'graphql-scalars';

export interface Forum {
  id: ObjectID;
  activityID: ObjectID;
  title: string;
  admin: User;
  participants: User[];
}

export interface User {
  id: ObjectID;
}

export type ObjectID = typeof GraphQLObjectID;
type Nullable<T> = T | null;
