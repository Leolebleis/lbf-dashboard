let base64 = require('base-64');

let path = process.env.REACT_APP_DB_PATH

function getAuthorization(auth) {
  return "Basic " + base64.encode(auth[0] + ":" + auth[1])
}

export function getQuotes(auth) {
  return fetch(path + '/quotes', {
    method: "GET",
    headers: {
      "Authorization": getAuthorization(auth)
    }
  })
    .then(response => response.json())
    .then(json => {
      return json
    })
}

export function getQuotesByName(name, auth) {
  return fetch(path + `/quotes/${name}`, {
    method: 'GET',
    headers: {
      "Authorization": getAuthorization(auth)
    }
  }).then(response => response.text())
}

export function createQuote(body, auth) {
  return fetch(path + '/quote/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": getAuthorization(auth)
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text()
    )
}

export function deleteQuote(id, auth) {
  return fetch(path + `/quote/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": getAuthorization(auth)
    }

  }).then(response => response.text())

}

export function modifyQuote(id, body, auth) {
  return fetch(path + `/quote/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": getAuthorization(auth)
    },
    body: JSON.stringify(body),

  }).then(response => response.json())
}