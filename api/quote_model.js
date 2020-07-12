const Pool = require('pg').Pool

let pool
if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    host: process.env.DB_LOCAL_HOST,
    database: process.env.DB_LOCAL_NAME,
    port: 5432,
  });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 5432,
  })
}

pool
  .query('CREATE TABLE IF NOT EXISTS quotes(id serial PRIMARY KEY, name VARCHAR(350), merchant VARCHAR(350), category VARCHAR(350), unit VARCHAR(350), unitPrice VARCHAR(350), dimensions VARCHAR(350))')
  .catch(err => console.log(err));


const getQuotes = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM quotes ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getQuotesByName = (query) => {
  return new Promise(function (resolve, reject) {
    let final_query = `SELECT * FROM quotes WHERE name LIKE '%${query}%'`

    pool.query(final_query, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })

}

const patchQuote = (id, body) => {
  const list_key = Object.keys(body);
  const list_values = Object.values(body);
  let query = ""

  list_key.forEach((key, index) => {
    query += `${key} = '${list_values[index]}'`
    if (index !== (list_key.length - 1)) {
      query += ", "
    }
  })

  return new Promise(function (resolve, reject) {
    let final_query = `UPDATE quotes SET ${query} WHERE id = ${id}`
    pool.query(final_query, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  })
}

const createQuote = (body) => {
  return new Promise(function (resolve, reject) {
    const { merchant, name, category, unitPrice, unit, dimensions } = body
    pool.query('INSERT INTO quotes (merchant, name, category, unitPrice, unit, dimensions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [merchant, name, category, unitPrice, unit, dimensions], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new quote has been added added: ${results.rows[0]}`)
    })
  })
}

const deleteQuote = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM quotes WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`${results.rowCount} quote deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getQuotes,
  createQuote,
  deleteQuote,
  patchQuote,
  getQuotesByName
}
