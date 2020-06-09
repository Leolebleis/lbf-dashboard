const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  database: 'my_database',
  port: 5432,
});

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
    const { merchant, name, category, unitPrice, unit } = body
    pool.query('INSERT INTO quotes (merchant, name, category, unitPrice, unit) VALUES ($1, $2, $3, $4, $5) RETURNING *', [merchant, name, category, unitPrice, unit], (error, results) => {
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
