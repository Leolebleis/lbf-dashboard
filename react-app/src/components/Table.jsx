import React from "react";
import Container from "react-bootstrap/Container";
import Header from "./Header";
import BootstrapTable from "react-bootstrap-table-next";
import {
  getQuotes,
  deleteQuote,
  modifyQuote,
  createQuote,
} from "../postgresClient";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AiFillDelete } from "react-icons/ai";
import { FaPen } from "react-icons/fa";

export default class Table extends React.Component {
  state = {
    quotes: [],
    showModifyModal: false,
  };

  handleOpenModal = () => {
    this.setState({
      show: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      show: false,
    });
  };

  columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "category",
      text: "Catégorie",
      sort: true,
    },
    {
      dataField: "merchant",
      text: "Fournisseur",
      sort: true,
    },
    {
      dataField: "name",
      text: "Nom",
      sort: true,
    },
    {
      dataField: "unit",
      text: "Unité",
      sort: true,
    },
    {
      dataField: "unitprice",
      text: "Prix unitaire H.T.",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: this.rankFormatter.bind(this),
    },
  ];

  defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  rankFormatter(cell, row) {
    return (
      <div id={row.id} className="row">
        <div className="col d-flex justify-content-center p-0">
          <div
            onClick={() => this.handleModify(row.id)}
            className="btn btn-large btn-outline-info"
          >
            <FaPen />
          </div>
        </div>
        <div className="col d-flex justify-content-center p-0">
          <div
            onClick={() => this.handleDelete(row.id)}
            className="btn btn-large btn-outline-danger"
          >
            <AiFillDelete />
          </div>
        </div>
      </div>
    );
  }

  handleModify = (id) => {
    let name = prompt("New name");

    name = JSON.stringify({ name });
    modifyQuote(id, name).then((response) => this.refreshState());
  };

  handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      deleteQuote(id).then((response) => {
        console.log(response);
        this.refreshState();
      });
    }
  };

  handleAdd = (event) => {
    event.preventDefault();

    console.log(event);
    console.log(event.target);
    this.handleCloseModal();
  };

  refreshState = () => {
    getQuotes().then((response) => {
      this.setState({
        quotes: response,
      });
    });
  };

  componentDidMount() {
    this.refreshState();
  }

  render() {
    return (
      <Container>
        <Header />

        <Button onClick={() => this.handleOpenModal()}>
          Ajouter une offre
        </Button>

        <Modal show={this.state.show} onHide={this.handleCloseModal}>
          <Container>
            <Form>
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
                <Form.Label>Unité</Form.Label>
                <Form.Control placeholder="Entrez le prix par unité" />
                <Form.Text className="text-muted">
                  Le prix doit être entré hors taxes.
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={this.handleAdd.bind(this)}
              >
                Submit
              </Button>
            </Form>
          </Container>
        </Modal>

        <BootstrapTable
          bootstrap4
          keyField="id"
          data={this.state.quotes}
          columns={this.columns}
          defaultSorted={this.defaultSorted}
        />
      </Container>
    );
  }
}
