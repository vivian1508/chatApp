export interface IChat {
  _id: string 
  name: string
  avatarUrl: string;
  lastMessage: IMessage
}

export interface IMessage {
  _id: string
  lastUpdateTime: string
  text: string
  creator: IUser
  createTime?: string
  chatId? : string
  creatorId?: string
}

export interface IUser {
  _id?: string
  name: string
  avatarUrl: string
  email?: string
}