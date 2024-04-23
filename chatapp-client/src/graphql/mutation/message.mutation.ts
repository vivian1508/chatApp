import { gql } from "@apollo/client";

export const CreateMessageMutation = gql`
  mutation($text: String!, $chatId: ID!, $creatorId: ID!, $createTime:String!, $lastUpdateTime:String!) {
    createMessage(text: $text, chatId: $chatId, creatorId: $creatorId, createTime: $createTime, lastUpdateTime:$lastUpdateTime) {
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