import React from 'react'
import Table from "./components/Table"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Container from "react-bootstrap/Container"

function App() {
  return (
    <Container>
      <Header />
      <Table />
      <Footer />
    </Container>
  );
}

export default App;
