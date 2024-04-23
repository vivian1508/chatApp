import { MongoClient, ServerApiVersion } from "mongodb";
import { ObjectId } from "mongodb";

//const uri = process.env.ATLAS_URI || "";
const uri = "mongodb+srv://vivianli1226:1ftmEs6B5qRFyZQX@cluster0.kulwxh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//console.log("mongdb uri", process.env);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
    console.error("error when building connection")
  console.error(err);
}

let db = client.db("chatapp_demo");

// try {
//     let collection = await db.collection("user");
//     let result = await collection.find({}).toArray();
//     // let query = { _id: new ObjectId('5a9427648b0beebeb69579e7') };
//     // let result = await collection.findOne(query);
//     console.log("successful get result", result);

// } catch(err) {
//     console.error("error when fetching collection data", err)
// }

export default db;