require("dotenv").config();
const {
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError }
} = require("com");
const { User, Post } = require("../../data/models");

/**
 * 
 * @param {string} userId The user's id 
 * @param {string} image  The user's image url 
 * @param {string} text  The user's post text 
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError } On empty name, email, or password (sync)
 * @throws {TypeError} On non-string name, email, or password (sync)
 * @throws {FormatError} On wrong format in URL (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 */

module.exports = function createPost(userId, image, text) {
    validateId(userId);
    validateUrl(image);
    validateText(text);

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError("user not found");

            console.log(user.name);

            return Post.create({
                author: userId,
                userName: user.name, 
                image,
                text,
                date: new Date(),
                likeCounter: [],
                visibility: "public"
            });
        });
};
