const { userService, articleService } = require("../libs");


const registerUser = async (req, res, next) => {
    try {
        const { name, username, email, password } = req.body;
        const newUser = await userService.createUser({ name, username, email, password });
        
        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (err) {
        next(err); // Jumps to your app.use((err, req, res, next) => {})
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await userService.findUserByEmail({ email });

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};


const getUserArticles = async (req, res, next) => {
    try {
        // 1. Extract params and the authenticated User ID
        const { search = '', page = 1, limit = 10 } = req.query;
        const userId = '69dcd28d3782afe63008918f'; // Assumes your auth middleware populates req.user

        // 2. Pass the userId to your service to filter the results
        const result = await articleService.findAllArticles({ 
            search, 
            page: parseInt(page), 
            limit: parseInt(limit),
            authorId: userId // Pass this to filter by owner
        });

        res.status(200).json({
            success: true,
            data: result.articles,
            pagination: {
                totalItems: result.totalArticles,
                totalPages: result.totalPages,
                currentPage: result.currentPage
            }
        });
    } catch (err) {
        next(err);
    }
};


const removeUser = async (req, res, next) => {
    try {
        const { email } = req.params;
        const success = await userService.deleteUserByEmail({ email });

        if (!success) {
            return res.status(404).json({ message: "User not found or already deleted" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        next(err)
    }
};

module.exports = {
    registerUser,
    getUserProfile,
    removeUser,
    getUserArticles
};