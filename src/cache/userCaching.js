const { getUsersArticleKey } = require("./keysWithUsers");
const { setJSON, getJSON } = require("./qurey");
const cache = require(".")

const saveUserAllArticle = (userid, articles) =>{

    const key = getUsersArticleKey(userid);

    const expire = new Date(Date.now() + 600000);

    return setJSON(key, articles, expire);
}


const fetchUserAllArticle = (userid) => {
    const key = getUsersArticleKey(userid);

    return getJSON(key);
}

const invalidateUserAllArticle = (userid)=>{
    const key = getUsersArticleKey(userid)
    cache.del(key);
}

module.exports = {
    saveUserAllArticle,
    fetchUserAllArticle,
    invalidateUserAllArticle
}