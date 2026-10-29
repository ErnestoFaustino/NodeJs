const { Pool } = require("pg")

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "postapp",
    user: "postgres",
    password: "passdev"

})

module.exports = pool