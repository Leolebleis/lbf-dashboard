let path = "http://localhost:3001"

export function getQuotes() {
  return fetch(path + '/quotes')
    .then(response => response.json())
    .then(json => {
      return json
    })
}

export function getQuotesByName(name) {
  return fetch(path + `/quotes/${name}`, {
    method: 'GET',
  }).then(response => response.text())
}

export function createQuote(body) {
  return fetch(path + '/quote/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text()
    )
}

export function deleteQuote(id) {
  return fetch(path + `/quote/${id}`, {
    method: 'DELETE',
  }).then(response => response.text())

}

export function modifyQuote(id, body) {
  return fetch(path + `/quote/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),

  }).then(response => response.json())
}