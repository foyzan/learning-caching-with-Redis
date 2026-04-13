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
        const articles = await articleService.findAllArticles();
        res.status(200).json(articles);
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