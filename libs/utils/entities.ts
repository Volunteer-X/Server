export type User = {
  id: string;
  createdAt: Date;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  username: string;
  picture?: string;
  picks: string[];
};

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
