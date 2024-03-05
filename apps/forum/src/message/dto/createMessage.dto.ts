// export type Message = {
//   id: string;
//   userID: string;
//   channelID: string;
//   text: string;
//   user: {
//     username: string;
//     picture?: string;
//   };
// };

export type CreateMessageDto = {
  channelID: string;
  userID: string;
  text: string;
};
