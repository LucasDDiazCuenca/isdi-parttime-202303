const { readFile } = require("fs")

module.exports = function retrieveUser(userId, callback) {
    //TODO VALIDADORES 

    //leer archivo 
    readFile("./data/users.json", "utf8", (error, json) => {
        if (error) {
            callback(error)
            return
        }
        const users = JSON.parse(json)
        //buscar user 
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error("User not found"))
            return
        }

        const _user = {
            name: user.name,
            avatar: user.avatar,
            savedPosts: user.savedPosts
        }
        //guardar y devolverlo en la callback 
        callback(null, _user)
    })
}