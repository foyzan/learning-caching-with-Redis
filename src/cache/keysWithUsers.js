

const getDynamicKeysWithUser = (key, userId)=>{

    return `${key}${userId}`;
}


const getUsersArticleKey = (userId)=>{
    const key = {
        userArticles: "userArticles"
    }

    Object.freeze(key)

    return getDynamicKeysWithUser(key.userArticles, userId)


}


module.exports = {
    getUsersArticleKey,
}