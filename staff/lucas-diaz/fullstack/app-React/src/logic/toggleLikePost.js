import { validators } from 'com'
import { savePost, findUserById, findPostByPostId } from "../data";
const {validateId} = validators


export default function toggleLikePost(userId, post, callback) {
    validateId(userId);

    findUserById(userId, foundUser => {

        findPostByPostId(post.id, foundPost => {

            if (!foundUser) {

                callback(new Error("There is no user with this id"));
                return;
            }
            if (!foundPost) {
                callback(new Error("There is no post with this post id"))
                return
            }

            if (foundPost.likeCounter.includes(foundUser.id)) {

                const foundUserIndex = foundPost.likeCounter.indexOf(foundUser.id)
                foundPost.likeCounter.splice(foundUserIndex, 1);

                savePost(foundPost, () => callback(null));
                return;
            }

            foundPost.likeCounter.push(foundUser.id);
            savePost(foundPost, () => callback(null));

        });
    });

}