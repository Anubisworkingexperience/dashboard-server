const pgp = require('pg-promise')();
const dotenv = require('dotenv');

dotenv.config();

const cn = process.env.DATABASE_URL

const db = pgp(cn);

module.exports = db;