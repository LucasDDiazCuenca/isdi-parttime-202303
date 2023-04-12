import { validatePasswordsChanges, validateId } from "./helpers/validators.mjs";
import { users } from "../data.mjs";


export default function updateUserPassword(authenticatedUserId, password, newPassword, newPasswordConfirm) {
    validatePasswordsChanges(password,newPassword, newPasswordConfirm);
    validateId( authenticatedUserId)


    const currentUser =  users.find(user => user.id === authenticatedUserId);
    const currentUserIndex = users.findIndex(user => user.id === authenticatedUserId);

    if (currentUser.password !== password.value) throw new Error("typed password isn't actual password user's value")
    if (password.value === newPassword.value) throw new Error("Password is equal than new password")
    if (newPassword.value !== newPasswordConfirm.value) throw new Error("New password and new password confirmation are not the same")

    users[currentUserIndex].password = newPassword.value;
}