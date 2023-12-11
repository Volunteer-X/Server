export type User = {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  id: string;
  email: string;
  username: string;
  role?: string;
  picture?: string;
  picks: string[];
};

// export type Ping = {};
