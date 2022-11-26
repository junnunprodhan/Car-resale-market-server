const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware using
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    res.send('welcome to Car-Resale server')
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cxbomvd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run(){
    try{
        const userCollection = client.db('CarMarket').collection('users');
    
        app.post('/users',async(req,res)=>{
            const users = req.body;
            console.log(users);
            const UserResult =await userCollection.insertOne(users);
            res.send(UserResult);
        })
        app.get('/users',async(req,res)=>{
            const users = req.body;
            console.log(users);
            const UserResult =await userCollection.insertOne(users);
            res.send(UserResult);
        })


        app.get('/users/:id', async(req, res)=>{
            const id =req.params.id;
            const serQuery={role:id}
            const productCursor=userCollection.find(serQuery)
            const product=await productCursor.toArray()
            res.send(product)
        })

        app.delete('/usersDelete/:id',async(req,res)=>{
            const id =req.params.id;
            const query ={_id:ObjectId(id)}
            const result =await userCollection.deleteOne(query)
            res.send(result)
        });


        const CategoryCollection = client.db('CarMarket').collection('category');
        app.post('/category', async(req, res) => {
            const category = req.body;
            const result= await CategoryCollection.insertOne(category);
            res.send(result); 
        })


        app.get('/category', async(req, res)=>{
            const query={}
            const Cursor=CategoryCollection.find(query);
            const category=await Cursor.toArray();
            res.send(category);
        })


        const ProductCollection = client.db('CarMarket').collection('Products');
        app.post('/product', async(req, res) => {
            const product = req.body;
            const result= await ProductCollection.insertOne(product);
            res.send(result); 
        })

        app.get('/product', async(req, res)=>{
            const query={}
            const Cursor=ProductCollection.find(query);
            const product=await Cursor.toArray();
            res.send(product);
        })

        app.get('/product/:id', async(req, res)=>{
            const id =req.params.id;
            const serQuery={category:id}
            const productCursor=ProductCollection.find(serQuery)
            const product=await productCursor.toArray()
            res.send(product)
        })


        app.get('/myProduct/:id', async(req, res)=>{
            const id =req.params.id;
            const serQuery={email:id}
            const productCursor=ProductCollection.find(serQuery)
            const product=await productCursor.toArray()
            res.send(product)
           
        })

        app.delete('/productDelete/:id',async(req,res)=>{
            const id =req.params.id;
            const query ={_id:ObjectId(id)}
            const result =await ProductCollection.deleteOne(query)
            res.send(result)
        });

    }
    finally{
    
    }
    
    }
    run().catch(err=>console.error(err))






app.listen(port, () => {
    console.log(`server running on port ${port}`);
})