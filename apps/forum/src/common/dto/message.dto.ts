export type Message = {
  id: string;
  userID: string;
  channelID: string;
  text: string;
  user: {
    username: string;
    picture?: string;
  };
};

export type CreateMessage = {
  channelID: string;
  userID: string;
  text: string;
};

export type Channel = {
  id: string;
  activityID: string;
  title: string;
  admin: string;
  participants?: string[];
};
