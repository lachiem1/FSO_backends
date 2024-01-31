require("dotenv").config(); // has to be imported before the model so that env variables from .env are globally available

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = { MONGODB_URI, PORT };
