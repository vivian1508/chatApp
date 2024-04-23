import { MongoClient, ServerApiVersion } from "mongodb";
import { ObjectId } from "mongodb";

//const uri = process.env.ATLAS_URI || "";
const uri = "mongodb+srv://vivianli1226:1ftmEs6B5qRFyZQX@cluster0.kulwxh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
} catch (err) {
  console.error("error when building connection")
  console.error(err);
}

let db = client.db("chatapp_demo");



export default db;