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


      app.get('/fooditems', async (req, res) => {
        const cursor = foodCollection.find();
        const result = await cursor.toArray([]);
        res.send(result);
    })


    app.get('/fooditems/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodCollection.findOne(query);
      res.send(result);
    });



    app.post('/fooditems', async (req, res) => {
      const productAdded = req.body;
      console.log(foodCollection);
      const result = await foodCollection.insertOne(foodAdded);
      res.send(result);
  })


  app.delete('/fooditems/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await foodCollection.deleteOne(query);
    res.send(result);
})



app.patch('/fooditems/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedFood = req.body;

  const updateDoc = {
    $set: {
      ...updatedFood,
    },
  };
  const result = await foodCollection.updateOne(filter, updateDoc);
  res.send(result);
});


app.post('/orders', async (req, res) => {
  const order = req.body;
  const result = await orderCollection.insertOne(order);
  res.send(result);
});
      // const orderCollection = client.db('eateryevo').collection('orders')

      // const gateman = (req,res)=>{

      //   const token = req.cookies
      // }


      // app.get('/api/v1/fooditems',async(req,res)=>{
      //   const cursor = foodCollection.find()
      //   const result = await cursor.toArray()
      //       res.send(result)
      //   })


      // app.post('/api/v1/user/orrder',async (req,res)=>{
      //   const order = req.body;
      //   const result = await orderCollection.insertOne(order)
      //   res/send(result)
      // })


      // app.delete('/api/v1/user/remove-order/:orderId',async(req,res)=>{
      //   const id=req.params.orderId
      //   const query={_id:new ObjectId(id)}
      //   const result = await orderCollection.deleteOne(query)
      //   res.send(result)
      // })


      // app.post('/api/v1/auth/access-token', (req, res) => {
      //   const user = req.body;
      //   const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
      //   res.cookie('token', token, {
      //       httpOnly: false,
      //       secure: true,
      //       sameSite: 'none',
      //     })
      //     .send({ success: true });
      // });


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