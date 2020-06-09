const express = require('express')
const app = express()
const port = 3001

const quote_model = require('./quote_model')


app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get("/quotes", (req, res) => {
  quote_model.getQuotes()
    .then(response => {
      res.status(200).send(response)
    }).catch(error => {
      res.status(500).send(error)
    })
})

app.get("/quotes/:search", (req, res) => {
  quote_model.getQuotesByName(req.params.search)
    .then(response => {
      res.status(200).send(response)
    }).catch(error => {
      res.status(500).send(error)
    })
})

app.post("/quote", (req, res) => {
  quote_model.createQuote(req.body)
    .then(response => {
      res.status(201).send(response)
    }).catch(error => {
      res.status(500).send(error)
    })
})

app.patch("/quote/:id", (req, res) => {
  quote_model.patchQuote(req.params.id, req.body)
    .then(response => {
      res.status(200).send(response)
    }).catch(error => {
      res.status(500).send(error)
    })
})

app.delete('/quote/:id', (req, res) => {
  quote_model.deleteQuote(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
