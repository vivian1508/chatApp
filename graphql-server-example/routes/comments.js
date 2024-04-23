import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/comments", async (req, res) => {
  let collection = await db.collection("user");
  let results = await collection.find({}).toArray();
  // let query = { _id: new ObjectId('5a9427648b0beebeb69579e7') };
  // let result = await collection.findOne(query);
  console.log("successful get result", results);
  res.send(results).status(200);
});


export default router;