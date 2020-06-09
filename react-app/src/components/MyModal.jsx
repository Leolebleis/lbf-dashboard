import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class MyModal extends React.Component {
  render(props) {
    
    let isAdd = this.props.type === "add";
    return (
      <Container className="p-5">
        <Form
          id={this.props.id}
          onSubmit={this.props.handleClick.bind(this)}
          controlId="validationCustom01"
        >
          <h1>
            {isAdd ? "Ajouter une offre" : "Modifier l'offre #" + this.props.id}
          </h1>
          <p>Changez uniquement les valeurs que vous souhaitez changer.</p>
          <Form.Group controlId="formCategory">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control
              inputRef={(ref) => {
                this.myInput = ref;
              }}
              placeholder="Entrez la catégorie"
              required={isAdd}
            />
            {isAdd ? (
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group controlId="formMerchant">
            <Form.Label>Fournisseur</Form.Label>
            <Form.Control
              placeholder="Entrez le nom du fournisseur"
              required={isAdd}
            />
            {isAdd ? (
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Nom</Form.Label>
            <Form.Control placeholder="Entrez le nom" required={isAdd} />
            {isAdd ? (
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group controlId="formUnit">
            <Form.Label>Unité</Form.Label>
            <Form.Control placeholder="Entrez l'unité" required={isAdd} />
            {isAdd ? (
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group controlId="formUnitPrice">
            <Form.Label>Prix par unité</Form.Label>
            <Form.Control
              placeholder="Entrez le prix par unité"
              required={isAdd}
            />
            {isAdd ? (
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            ) : (
              ""
            )}
            <Form.Text className="text-muted">
              Le prix doit être entré hors taxes.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
