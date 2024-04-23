
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

export const MESSAGES_BY_CHAT_ID_QUERY = gql`
  query($chatId: ID!) {
    messagesByChatId(chatId: $chatId) {
      _id
      text
      createTime
      lastUpdateTime
      chatId
      creatorId
      creator {
        avatarUrl
        name
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query {
    users {
      id
      name
      imgSrc
      chatIds 
    }
  }
`;

export const USER_BY_ID_QUERY = gql`
  query($email: String!) {
    userById(email: $email) {
      email
      name
      imgSrc
      chats {
        id
        toEmail
        creator {
          name
          email
          imgSrc
        }
      }  
    }
  }
`;