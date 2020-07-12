const express = require('express')
const basicAuth = require("express-basic-auth")
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 3001;
require('dotenv').config()

const quote_model = require('./quote_model')

let password = process.env.PASSWORD
let activeEnv = process.env.NODE_ENV

const auth = basicAuth({
  users: {
    adminlbf: password,
  }
})

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

app.get('/read-cookie', (req, res) => {
  if (req.signedCookies.name === 'adminlbf') {
    res.send({ screen: 'admin' });
  } else {
    res.send({ screen: 'auth' });
  }
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('name').end();
});

app.get("/authenticate", auth, (req, res) => {
  console.log(req.headers.authorization)
  const options = {
    httpOnly: true,
    signed: true,
  };

  if (req.auth.user === 'adminlbf') {
    res.cookie('name', 'admin', options).send({ screen: 'admin' });
  }
})

app.get('/', (req, res) => {
  res.status(200).send(activeEnv);
})

app.get("/quotes", auth, (req, res) => {
  quote_model.getQuotes()
    .then(response => {
      res.status(200).send(response)
    }).catch(error => {
      res.status(500).send(error)
    })
})

app.get("/quotes/:search", auth, (req, res) => {
  quote_model.getQuotesByName(req.params.search)
    .then(response => {
      res.status(200).send(response)
    }).catch(error => {
      res.status(500).send(error)
    })
})

app.post("/quote", auth, (req, res) => {
  quote_model.createQuote(req.body)
    .then(response => {
      res.status(201).send(response)
    }).catch(error => {
      res.status(500).send(error)
    })
})

app.patch("/quote/:id", auth, (req, res) => {
  quote_model.patchQuote(req.params.id, req.body)
    .then(response => {
      res.status(200).send(response)
    }).catch(error => {
      res.status(500).send(error)
    })
})

app.delete('/quote/:id', auth, (req, res) => {
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
