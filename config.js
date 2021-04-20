const dotenv = require('dotenv');

//console.log(dotenv.config());

// parse .env file
dotenv.config();

module.exports = {
    OW_KEY = process.env.OW_API_KEY
};