const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

// port
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())


// 
const uri = `mongodb+srv://${process.env.TCD_USER}:${process.env.TCD_PASS}@cluster0.l30j2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('Genius car db connected');
  // perform actions on the collection object
  client.close();
});



//
app.get('/', (req, res) => {
res.send('Genius server is running')
})


// 
app.listen(port, ()=>{
    console.log('Listening to port', port);
})