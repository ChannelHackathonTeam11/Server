require('dotenv').config();
const env = process.env;

const development = {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: "mysql",
    //port: env.MYSQL_PORT
};

const production = {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD_TEST,
    database: env.DATABASE_NAME_TEST,
    host: env.DATABASE_HOST_TEST,
    dialect: "mysql",
};

const test = {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD_TEST,
    database: env.DATABASE_NAME_TEST,
    host: env.DATABASE_HOST_TEST,
    dialect: "mysql",
};

module.exports = { development, production, test };