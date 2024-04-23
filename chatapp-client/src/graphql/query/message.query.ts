import { gql } from "@apollo/client";
export const MessagesByChatIdQuery = gql`
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