import { gql } from "@apollo/client";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription($chatId: ID!) {
    newMessageAdded(chatId: $chatId) {
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