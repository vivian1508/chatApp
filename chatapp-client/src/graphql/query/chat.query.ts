
import { gql } from "@apollo/client";

export const ChatsByUserQuery = gql`
  query($email: String!) {
    chatsByUser(email: $email) {
      id
      toEmail
      fromEmail
      lastUpdateTime
      creator {
        email
        name
        imgSrc
      }
      receiver {
        imgSrc
        name
        email
      }
      messages {
        _id
        chatId
        fromEmail
      }
    }
  }
`;