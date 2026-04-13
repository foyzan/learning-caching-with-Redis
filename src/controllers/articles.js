const { articleService } = require("../libs");


const createArticle = async (req, res, next) => {
    
    try {
        const { title, body, status, author } = req.body;
        const article = await articleService.createArticle({ title, body, status, author });
        
        res.status(201).json(article);
    } catch (err) {
        next(err);
    }
};

const getAllArticles = async (req, res, next) => {
    try {
        // 1. Extract query parameters with sensible defaults
        const { 
            search = '', 
            page = 1, 
            limit = 10 
        } = req.query;

        // 2. Pass the query object to the service
        // This now returns { articles, totalPages, currentPage, totalArticles }
        const result = await articleService.findAllArticles({ 
            search, 
            page: parseInt(page), 
            limit: parseInt(limit) 
        });

        // 3. Send the structured response
        res.status(200).json({
            success: true,
            data: result.articles,
            pagination: {
                totalItems: result.totalArticles,
                totalPages: result.totalPages,
                currentPage: result.currentPage,
                limit: parseInt(limit)
            }
        });
    } catch (err) {
        next(err);
    }
};


const getArticleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await articleService.findSingleArticles({ id });

        if (!article) {
            const error = new Error("Article not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json(article);
    } catch (err) {
        next(err);
    }
};

const removeArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isDeleted = await articleService.deleteSingleArticles({ id });

        if (!isDeleted) {
            const error = new Error("Could not delete. Article may not exist.");
            error.status = 404;
            throw error;
        }

        res.status(200).json({ message: "Article deleted successfully" });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    removeArticle
}