import React from "react";

export default class MyModal extends React.Component {
  render() {
    return (
      <Container>
        <Form onSubmit={(e) => this.handleAdd(e)}>
          <h1>Ajouter une offre</h1>
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
