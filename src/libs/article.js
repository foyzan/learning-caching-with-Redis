const Articles = require("../models/articles");

const createArticle = async ({ title, body, status = 'published', author = '69dcd28d3782afe63008918f' }) => {
    const article = new Articles({ title, body, status, author });
    await article.save();
    
    // Returning the document as a plain object with 'id' mapped
    return { ...article.toObject(), id: article._id };
};

const findAllArticles = async () => {
    // .lean() makes the query faster by returning plain JS objects
    return await Articles.find().lean();
};

const findSingleArticles = async ({ id }) => {
    // Mongoose's findById is a shorthand for findOne({ _id: id })
    const article = await Articles.findById(id).lean();
    return article || null;
};

const deleteSingleArticles = async ({ id }) => {
    // findByIdAndDelete returns the document that was removed
    const deletedArticle = await Articles.findByIdAndDelete(id);
    return !!deletedArticle; // Returns true if deleted, false if not found
};


module.exports = {
    createArticle,
    findAllArticles,
    findSingleArticles,
    deleteSingleArticles,
}