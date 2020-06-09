import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class MyModal extends React.Component {
  render(props) {
    return (
      <Container className="p-5">
        <Form id={this.props.id} onSubmit={this.props.handleClick.bind(this)}>
          <h1>
            {this.props.type === "add"
              ? "Ajouter une offre"
              : "Modifier l'offre #" + this.props.id}
          </h1>
          <p>Changez uniquement les valeurs que vous souhaitez changer.</p>
          <Form.Group controlId="formCategory">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control
              inputRef={(ref) => {
                this.myInput = ref;
              }}
              placeholder="Entrez la catégorie"
            />
          </Form.Group>

          <Form.Group controlId="formMerchant">
            <Form.Label>Fournisseur</Form.Label>
            <Form.Control placeholder="Entrez le nom du fournisseur" />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Nom</Form.Label>
            <Form.Control placeholder="Entrez le nom" />
          </Form.Group>

          <Form.Group controlId="formUnit">
            <Form.Label>Unité</Form.Label>
            <Form.Control placeholder="Entrez l'unité" />
          </Form.Group>

          <Form.Group controlId="formUnitPrice">
            <Form.Label>Prix par unité</Form.Label>
            <Form.Control placeholder="Entrez le prix par unité" />
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
