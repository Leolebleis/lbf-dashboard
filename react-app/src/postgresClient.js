export function getQuotes() {
  return fetch('http://localhost:3001/quotes')
    .then(response => response.json())
    .then(json => {
      return json
    })
}

export function createQuote(body) {
  return fetch('http://localhost:3001/quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      return response.json();
    })
}

export function deleteQuote(id) {
  return fetch(`http://localhost:3001/quote/${id}`, {
    method: 'DELETE',
  }).then(response => response.text())

}

export function modifyQuote(id, body) {
  return fetch(`http://localhost:3001/quote/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,

  }).then(response => response.json())
}