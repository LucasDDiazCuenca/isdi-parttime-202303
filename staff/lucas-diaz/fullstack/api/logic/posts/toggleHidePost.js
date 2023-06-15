const { readFile, writeFile } = require("fs")
const { validators: { validateId } } = require("com")

module.exports = function toggleHidePost(userId, postId, callback) {
    validateId(userId)
    validateId(postId)

    readFile("./data/users.json", (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        const user = users.find(_user => _user.id === userId)

        if (!user) {
            callback(new Error("user not found"))
            return
        }

        readFile("./data/posts.json", (error, json) => {
            if (error) {
                callback(error)
                return
            }
            const posts = JSON.parse(json)
            const foundPost = posts.find(post => post.id === postId)

            if (!foundPost) {
                callback(new Error("post not found"))
                return
            }

            if (foundPost.author !== userId) {
                callback(new Error("this user has not permition to hide this post"))
                return
            }

            if(foundPost.visibility !== "private"){
                foundPost.visibility = "private";
            } else {
                foundPost.visibility = "public";
            }

            json = JSON.stringify(posts, null, 4)

            writeFile("./data/posts.json", json, error => {
                if (error) {
                    callback(error)
                    return
                }
                callback(null)
            })
        })
    })
}