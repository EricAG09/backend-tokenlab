const dotenv = require('dotenv');
dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);