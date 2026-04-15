const {createClient} = require('redis')

const redisUrl = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

const client = createClient({url: redisUrl})

client.on("connect", () => console.info("Cache is connecting"))
client.on("ready", () => console.info("Cache is ready"))
client.on("end", () => console.info("Cache is disconnected"))
client.on("reconnecting", () => console.info("Cache is reconnecting"))
client.on("error", e => console.error(e))


const connect = async ()=>{
    try {
        await client.connect()
    } catch (error) {
        console.error("Redis error")
        console.log(error)
    }
}


connect()

module.exports = client;