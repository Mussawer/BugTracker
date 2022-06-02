const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5433,
}

const proConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addons
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);


// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;