import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnknownError,
} from 'apps/users/src/user/graphql/user.schema';

import { User } from 'apps/users/src/entity/user.entity';

// export type User = {
//   id: string;
//   createdAt: Date;
//   name: {
//     firstName: string;
//     middleName?: string;
//     lastName: string;
//   };
//   email: string;
//   username: string;
//   picture?: string;
//   picks: string[];
//   devices: string[];
//   ping?: {
//     __typename: 'Ping';
//     id: string;
//   }[];
//   activityCount: number;
// };

export type TUser =
  | User
  | UnauthorizedError
  | NotFoundError
  | UnknownError
  | InternalServerError;

export type Ping = {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  picks: string[];
  url: string;
  radius: number;
  latitude: number;
  longitude: number;
  media: {
    key: string;
    type: string;
  }[];
  userID: string;
  user: User;
};
