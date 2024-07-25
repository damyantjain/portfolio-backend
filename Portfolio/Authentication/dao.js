import model from "./model.js";

export const createUser = (username, password) => model.create({ username, password });
export const findUserByUsername = (decryptedUsername) => model.findOne({ username: decryptedUsername });