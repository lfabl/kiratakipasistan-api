import { r } from '../db';
export let TOKEN_SECRET_KEY = "nibgat";
export const createSecretToken = (key) => {
    TOKEN_SECRET_KEY = key;
};