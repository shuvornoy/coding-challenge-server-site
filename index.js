const { request } = require('express');
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const cors = require('cors')
require("dotenv").config();
const port = 5000;
app.get('/', (req, res) => {
    res.send('coding challenge')
});
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.izvrctz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function name () {
    try{
        const userData = client.db("coding").collection("users");
        app.post("/product", async (req, res) => {
          const user = req.body;
          const result = await userData.insertOne(user);
          res.send(result)
        }); 

        app.get("/users", async (req, res) => {
          const services = await userData.find({}).toArray();
          res.send(services);
        });

       
        app.get('/update/:id', async (req, res)=>{
          const id = req.params.id;
          const data = new { _id: ObjectId(id) };
          const result = await userData.findOne(data);
          res.send(result)
        })
      
    }
    finally{
        
    }
} name().catch((error)=>console.log(error))




app.listen(port, () => {
  console.log("server running", port);
});


