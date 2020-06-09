import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <hr />
        <Row className="pb-5 pt-3">
          <Col className="col-auto">
            <a
              href="https://leolebleis.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Made with{" "}
              <span role="img" aria-label="heart">
                ♥️
              </span>{" "}
              by Leo Le Bleis.
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}
