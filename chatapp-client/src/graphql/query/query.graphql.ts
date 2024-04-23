
import { gql } from "@apollo/client";

export const CHAT_QUERY = gql`
  query {
    chats {
        _id
        lastMessage {
          _id
          creator {  
            avatarUrl
            name
          }
          lastUpdateTime
          text
        }
        name
        avatarUrl
    }
  }
`;