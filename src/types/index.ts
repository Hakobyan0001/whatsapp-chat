export interface IMessage {
  chatId: string;
  idMessage: string;
  type: "incoming" | "outgoing";
  typeMessage?: string;
  textMessage: string;
}

export interface IChat {
  id: string;
  name: string;
  avatar: string | null;
  lastMessage: string;
  unreadCount: number;
  messages: IMessage[]; 
}
