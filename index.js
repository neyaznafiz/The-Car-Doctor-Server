const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express()

// port
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())


// 
const uri = `mongodb+srv://${process.env.TCD_USER}:${process.env.TCD_PASS}@cluster0.l30j2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const serviceCollection = client.db('theCarDoctor').collection('service')

        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })

        // POST
        app.post('/service', async (req, res) => {
            const newService = req.body
            const result = await serviceCollection.insertOne(newService)
            res.send(result)
        })
    }
    finally {

    }
}

run().catch(console.dir)


//
app.get('/', (req, res) => {
    res.send('Genius server is running')
})


// 
app.listen(port, () => {
    console.log('Listening to port', port);
})