const { createPost } = require("../logic")
const { extractToken } = require("../helpers")

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)
        const { image, text } = req.body

        createPost(userId, image, text)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}