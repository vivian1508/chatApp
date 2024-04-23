import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

const resolvers = {
  Query: {
    async userById(_, { _id }) {
      let query = { _id: new ObjectId(_id) };
      let collection = await db.collection("users");
      let result = await collection.findOne(query);
      return result;
    },

    async users() {
      let collection = await db.collection("users");
      let results = await collection.find({}).toArray();
      return results;
    },

    async messagesByChatId(_, { chatId }) {
      const collection = await db.collection("messages");
      const results = await collection.find({ chatId: new ObjectId(chatId) }).sort({ lastUpdateTime: 1 }).toArray();
      return results;
    },

    async chats() {
      let collection = await db.collection("chats");
      let results = await collection.find({}).toArray();
      return results;
    }
  },

  Chat: {
    async lastMessage({ _id }) {
      const collection = await db.collection("messages");
      const results = await collection.find({ chatId: _id }).sort({ lastUpdateTime: -1 }).toArray();
      if (results.length === 0) {
        return null;
      }
      return results[0];
    }
  },

  Message: {
    async creator(parent, _) {
      let collection = await db.collection("users");
      let query = { _id: parent.creatorId };
      let result = await collection.findOne(query);
      return result;
    }
  },


  Mutation: {
    async createMessage(_, { text, chatId, creatorId, createTime, lastUpdateTime },) {
      let collection = await db.collection("messages");
      const chatObjectId = new ObjectId(chatId);
      const creatorObjectId = new ObjectId(creatorId);
      const newMessage = { text, chatId: chatObjectId, creatorId: creatorObjectId, createTime, lastUpdateTime }
      const insert = await collection.insertOne(newMessage);
      if (insert.acknowledged) {
        const insertedMessage = {
          ...newMessage, _id: insert.insertedId
        }
        pubsub.publish("newMessageAdded", {
          newMessageAdded: { ...insertedMessage }
        });
        return insertedMessage;
      }
      return null;
    },
  },

  Subscription: {
    newMessageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("newMessageAdded"),
        (payload, variables) => {
          return payload.newMessageAdded.chatId.toString() === variables.chatId;
        }
      )
    },
  }
};

export default resolvers;