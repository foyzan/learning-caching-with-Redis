const Articles = require("../models/articles");
const Users = require("../models/Users");
const mongoose = require('mongoose');

const createUser = async ({ name, username, email, password }) => {
    // 1. Hash the password before saving!
    

    const user = new Users({ 
        name, 
        username, 
        email, 
        password
    });

    await user.save();

    // Mapping _id to id for easier frontend consumption
    const userObj = user.toObject();
    return { ...userObj, id: userObj._id };
};

const findUserByEmail = async ({ email }) => {
    // Changed 'User' to 'Users' to match your import
    const user = await Users.findOne({ email }).lean();

    // Returns the user object if found, or null if not
    return user || null; 
};


const deleteUserByEmail = async ({ email }) => {
    // We use deleteOne to remove a single document matching the criteria
    const result = await Users.deleteOne({ email });

    /* result.deletedCount will be 1 if a user was found and deleted, 
       or 0 if no user matched that email.
    */
    return result.deletedCount > 0;
};
const findAllUsersArticles = async (query = {}) => {

    try {
        const user = await Users.findById("69dcd28d3782afe63008918f")

        return user;
    } catch (error) {
        console.log(error)
    }
    // // Build the filter
    // let filter = {};
    
    // // 1. Convert and apply authorId if it exists
    // if (authorId) {
    //     filter.author = new mongoose.Types.ObjectId('69dcd28d3782afe63008918f');

    //     console.log(filter.author)
    // }

    // // Add search logic
    // if (search) {
    //     filter.$and = [
    //         ...(filter.author ? [{ author: filter.author }] : []),
    //         {
    //             $or: [
    //                 { title: { $regex: search, $options: 'i' } },
    //                 { content: { $regex: search, $options: 'i' } }
    //             ]
    //         }
    //     ];
    // }

    // const articles = await Articles.find(filter)
    //     .limit(limit * 1)
    //     .skip((page - 1) * limit)
    //     .sort({ createdAt: -1 })
    //     .lean();

    // const total = await Articles.countDocuments(filter);

    // return { articles, totalPages: Math.ceil(total / limit), currentPage: Number(page), totalArticles: total };
};

module.exports = {
    createUser,
    findUserByEmail,
    deleteUserByEmail,
    findAllUsersArticles
}