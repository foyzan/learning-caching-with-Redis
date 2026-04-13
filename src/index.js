require('dotenv').config()

const http = require('http');
const app = require('./app');
const connectDB = require('./db/connectDB');
const redisClient = require('./cach/index');
const server = http.createServer(app)

const  main = async () =>{
    await connectDB();
    const port = process.env.PORT || 4000
    server.listen(port, async ()=>{
        console.log('server is running on port ' + port)
    })
}

main().catch((err)=>{console.log(err)})