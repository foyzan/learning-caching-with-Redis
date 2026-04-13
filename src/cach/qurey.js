const cache = require(".")


const setJSON = async (key, value, expire = null) =>{

    const json = JSON.stringify(value)
    if(expire){
        const ttlMills = expire?.getTime() - Date.now()
        return cache.set(key, value, {PX: ttlMills});
    }

    return cache.set(key, value);
}


const getJSON = async (key) =>{

    const type = await cache.type(key)

    if(type !== "string") return null;

    const json = await cache.get(key);

    if(json) return JSON.parse(json);
}