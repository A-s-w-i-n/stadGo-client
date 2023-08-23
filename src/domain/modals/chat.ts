export interface Chats {
  _id: string;
  chatname: string;
  user: string;
  owner: string;
  latestMessage: latest;
}

export interface latest {
  chat: string;
  content: string;
}

export interface message {
  _id: string;
  user: string;
  owner: string;
  content: string;
  chats: Chats;
  createdAt: string;
}
