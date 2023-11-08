const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.enfgege.mongodb.net/eateryevo?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection

      const foodCollection = client.db('eateryevo').collection('fooditems')
      const orderCollection = client.db('eateryevo').collection('orders')


      app.get('/api/v1/fooditems',async(req,res)=>{
        const cursor = foodCollection.find()
        const result = await cursor.toArray()
            res.send(result)
        })


      app.post('/api/v1/user/orrder',async (req,res)=>{
        const order = req.body;
        const result = await orderCollection.insertOne(order)
        res/send(result)
      })


      app.delete('/api/v1/user/remove-order/:orderId',async(req,res)=>{
        const id=req.params.orderId
        const query={_id:new ObjectId(id)}
        const result = await orderCollection.deleteOne(query)
        res.send(result)
      })


      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);
  

const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("hello world")
})




app.listen(port,()=>{
    console.log(`EateryEvo server listening on port ${port}`);
})