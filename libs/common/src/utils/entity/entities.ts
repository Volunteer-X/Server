import { User } from '@user/entity/user.entity';

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
