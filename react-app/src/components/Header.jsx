import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../assets/lbf_logo.png"

export default class Header extends React.Component {
  render() {
    return (
      <Row className="align-items-center mt-3">
        <Col className="col-auto">
          <img className="d-block h-auto" style={{width: "150px"}} src={logo} alt="logo LBF" />
        </Col>
        <Col className="col-auto">
          <h1 className="mt-4">LBF Paysagiste - Offres</h1>
        </Col>
      </Row>
    );
  }
}
