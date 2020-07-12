import React from 'react';
import Table from "./components/Table"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import { getQuotes } from "./postgresClient"

import Form from "react-bootstrap/Form"

import axios from 'axios';

let path = process.env.REACT_APP_DB_PATH

let View = (props) => {
  const { setScreen } = props;

  const deleteCookie = async () => {
    try {
      await axios.get(path + '/clear-cookie');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Button className="float-right" onClick={deleteCookie}>Déconnexion</Button>
      <Header />
      <Table quotes={props.quotes} username={props.username} password={props.password} />
      <Footer />
    </div>
  );
}

class App extends React.Component {

  state = {
    screen: "",
    username: "",
    password: "",
    quotes: []
  }

  auth = async () => {

    let username = this.state.username;
    let password = this.state.password;

    try {
      const res = await axios.get(path + '/authenticate', { auth: { username, password } })
      getQuotes([username, password]).then((result) => {
        this.setState({
          quotes: result
        })
      }).then(() => {
        if (res.data.screen !== undefined) {
          this.setState({
            screen: res.data.screen
          })
        }
      });

    } catch (e) {
      console.log(e);
    }
  };

  readCookie = async () => {
    try {
      const res = await axios.get(path + '/read-cookie');

      if (res.data.screen !== undefined) {
        this.setState({
          screen: res.data.screen
        })
      }
    } catch (e) {
      this.setState({
        screen: "auth"
      })
      console.log(e);
    }
  };

  onSubmit = (event) => {
    event.preventDefault()
  }

  componentDidMount() {
    this.readCookie()
  }

  setScreen = (e) => {
    this.setState({
      screen: e
    })
  }

  handleLogin = (e) => {
    e.preventDefault()

    let username = e.target[0].value
    let password = e.target[1].value

    this.setState({
      username: username,
      password: password
    }, () => {
      this.auth()
    })
  }

  render() {
    let screen = this.state.screen
    let username = this.state.username
    let password = this.state.password
    let quotes = this.state.quotes

    return (
      <Container>
        {screen === 'auth'
          ?
          <Row className="justify-content-center mt-5">
            <Form className="w-50" onSubmit={(e) => this.handleLogin(e)}>
              <Form.Label>Nom de compte:</Form.Label>
              <br />
              <Form.Control type="text" />
              <br />
              <Form.Label>Mot de passe:</Form.Label>
              <br />
              <Form.Control type="password" />
              <br />
              <Button type="submit">Connexion</Button>
            </Form>
          </Row>
          : <View quotes={quotes} username={username} password={password} screen={screen} setScreen={this.setScreen} />
        }
      </Container>
    )
  }
}


export default App;
