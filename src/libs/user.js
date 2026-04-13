const Users = require("../models/Users");


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


module.exports = {
    createUser,
    findUserByEmail,
    deleteUserByEmail
}