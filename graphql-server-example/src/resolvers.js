import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

const resolvers = {
  Query: {
    async userById (_, {_id}) {
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

    // async chatsByUser(_, {email}) {
    //   const collection  = await db.collection("chats");
    //   const result_1 = await collection.find({fromEmail: email}).toArray();
    //   const result_2 = await collection.find({toEmail: email}).toArray();
    //   //let results = await collection.find({}).toArray();
    //   const results = [...result_1, ...result_2]
    //   return results;
    // },

    async messagesByChatId(_, {chatId}) {
      const collection  = await db.collection("messages");
      const results = await collection.find({chatId: new ObjectId(chatId)}).sort({lastUpdateTime: 1}).toArray();
      return results;
    },

    async chats() {
      let collection = await db.collection("chats");
      let results = await collection.find({}).toArray();
      return results; 
    }
  },

  // User: {
  //   // Resolver for the 'avatarUrl' field of the 'User' type
  //   avatarUrl: (parent, args, context) => {
  //     console.log("jump into user")
  //     // Return the avatar URL of the user from the user object or another data source
  //     return parent.avatarUrl;
  //   },
  // },

  Chat: {
    // async messages({_id}, _) {
    //   const collection = await db.collection("messages");
    //   const results = await collection.find({chatId: _id}).sort({lastUpdateTime: 1}).toArray();
    //   return results;
    // },

    async lastMessage({_id}) {
      const collection = await db.collection("messages");
      const results = await collection.find({chatId: _id}).sort({lastUpdateTime: -1}).toArray();
      if(results.length === 0) {
        return null;
      }
      return results[0];
    }
  },

  Message: {
    async creator(parent, _) {
      let collection = await db.collection("users");
      // console.log("parent param:", parent)
      // console.log("message id:", parent._id)
      // console.log("creator id:", parent.creatorId)
      let query = { _id: parent.creatorId};
      let result = await collection.findOne(query);
      // console.log("result:", result)
      return result;
    }
  },


  Mutation: {
    async createMessage(_, { text, chatId, creatorId, createTime, lastUpdateTime }, ) {
      let collection = await db.collection("messages");
      const chatObjectId = new ObjectId(chatId);
      const creatorObjectId = new ObjectId(creatorId);
      const newMessage = {  text, chatId: chatObjectId, creatorId: creatorObjectId, createTime, lastUpdateTime}
      const insert = await collection.insertOne(newMessage);
      if (insert.acknowledged) {
        const insertedMessage = {
          ...newMessage, _id: insert.insertedId
        }
        console.log("save to database success")
        pubsub.publish("newMessageAdded", {
          newMessageAdded: {...insertedMessage}
        });
        console.log("publish new message", insertedMessage)

        return insertedMessage;
      }
        // return { text, chatId, fromEmail, 
        //   toEmail, createTime, lastUpdateTime, _id: insert.insertedId};
      return null;
    },

    // async updateRecord(_, args, context) {
    //   const id = new ObjectId(args.id);
    //   let query = { _id: new ObjectId(id) };
    //   let collection = await db.collection("records");
    //   const update = await collection.updateOne(
    //     query,
    //     { $set: { ...args } }
    //   );

    //   if (update.acknowledged)
    //     return await collection.findOne(query);

    //   return null;
    // },
    // async deleteRecord(_, { id }, context) {
    //   let collection = await db.collection("records");
    //   const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
    //   return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
    // },
  },

  Subscription: {
    newMessageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("newMessageAdded"),
        (payload, variables) => {
          console.log("subscription get new message")
          console.log("payload: ", payload);
          console.log("variables: ", variables);
          console.log("new match returns:", payload.newMessageAdded.chatId.toString() === variables.chatId);
          return payload.newMessageAdded.chatId.toString() === variables.chatId;
        }
      )
    },
  }
};

export default resolvers;