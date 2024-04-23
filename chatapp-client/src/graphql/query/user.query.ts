import { gql } from "@apollo/client";

export const UsersQuery = gql`
  query {
    users {
      id
      name
      imgSrc
      chatIds 
    }
  }
`;

export const UserByIdQuery = gql`
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