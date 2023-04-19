import { savePosts, saveUsers } from "../data";
import { findUserById, findUserPostByPostId } from "./helpers/data-managers";
import { validateId } from "./helpers/validators";


export default function likeAPost(userId, post, likeIcon, likeIconText){
    validateId(userId);

    let foundUser = findUserById(userId);
    let foundPost = findUserPostByPostId(post.id);

    if (!foundUser)  throw new Error ("There is no user with this id");
    if (!foundPost)  throw new Error ("There is no post with this post id")

    if(foundUser.likedPosts.includes(foundPost.id)){
        likeIcon.classList.remove("material-symbols-rounded-liked");

        const foundPostIndex = foundUser.likedPosts.indexOf(foundPost.id);
        foundUser.likedPosts.splice(foundPostIndex,1);

        const foundUserIndex = foundPost.likeCounter.indexOf(foundUser.id)
        foundPost.likeCounter.splice(foundUserIndex,1);
        
        likeIconText.textContent = `${foundPost.likeCounter.length} likes`
        savePosts();
        saveUsers();
        return;
    }
    

    foundUser.likedPosts.push(foundPost.id);
    foundPost.likeCounter.push(foundUser.id);
    likeIconText.textContent = `${foundPost.likeCounter.length} likes`
    likeIcon.classList.add("material-symbols-rounded-liked");
    savePosts();
    saveUsers();
}