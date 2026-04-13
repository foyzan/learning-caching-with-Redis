const Articles = require("../models/articles");

const createArticle = async ({ title, body, status = 'published', author = '69dcd28d3782afe63008918f' }) => {
    const article = new Articles({ title, body, status, author });
    await article.save();
    
    // Returning the document as a plain object with 'id' mapped
    return { ...article.toObject(), id: article._id };
};

const findAllArticles = async (query = {}) => {
    const { 
        search, 
        page = 1, 
        limit = 10 
    } = query;

    // 1. Build the search filter
    // Uses regex for a case-insensitive partial match on title or content
    const filter = search 
        ? { 
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ] 
          } 
        : {};

    // 2. Execute query with pagination logic
    const articles = await Articles.find(filter)
        .limit(limit * 1)             // Convert to number and restrict results
        .skip((page - 1) * limit)     // Skip previous pages
        .sort({ createdAt: -1 })      // Usually best to show newest first
        .lean();

    // 3. Get total count for frontend pagination UI
    const total = await Articles.countDocuments(filter);

    return {
        articles,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        totalArticles: total
    };
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