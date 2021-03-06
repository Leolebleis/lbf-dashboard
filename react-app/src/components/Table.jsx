import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { AiFillDelete } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import MyModal from "./MyModal";
import {
  getQuotes,
  deleteQuote,
  modifyQuote,
  createQuote,
} from "../postgresClient";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: props.quotes,
      filteredQuotes: props.quotes,
      categories: this.getCategories(props.quotes),
      query: "",
      activeFilter: "",
      showModifyModal: false,
      showAddModal: false,
      id: 0,
      username: props.username,
      password: props.password,
    };
  }

  toggleAddModal = () => {
    this.setState({
      showAddModal: !this.state.showAddModal,
    });
  };

  toggleModifyModal = (id) => {
    this.setState({
      showModifyModal: !this.state.showModifyModal,
      id: id,
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
      dataField: "dimensions",
      text: "Dimensions",
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
            onClick={() => this.toggleModifyModal(row.id)}
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

  handleModifyClick = (event) => {
    event.preventDefault();

    let category = event.target[0].value;
    let merchant = event.target[1].value;
    let name = event.target[2].value;
    let unit = event.target[3].value;
    let unitPrice = event.target[4].value;
    let dimensions = event.target[5].value;

    let newQuote = {};

    Object.assign(
      newQuote,
      category ? { category } : null,
      merchant ? { merchant } : null,
      name ? { name } : null,
      unit ? { unit } : null,
      unitPrice ? { unitPrice } : null,
      dimensions ? { dimensions } : null
    );

    modifyQuote(event.target.getAttribute("id"), newQuote, [
      this.state.username,
      this.state.password,
    ]).then(() => {
      this.refreshState();
      this.toggleModifyModal();
    });
  };

  handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      deleteQuote(id, [this.state.username, this.state.password]).then(() => {
        this.refreshState();
      });
    }
  };

  getCategories = (quotes) => {
    let categories = [];
    quotes.forEach((quote) => {
      if (!categories.includes(quote.category)) {
        categories.push(quote.category);
      }
    });

    return categories;
  };

  refreshState = (firstTime) => {
    getQuotes([this.state.username, this.state.password]).then((response) => {
      let categories = this.getCategories(response);

      if (firstTime) {
        this.setState({
          quotes: response,
          filteredQuotes: response,
          categories: categories,
        });
      } else {
        this.setState(
          {
            quotes: response,
            filteredQuotes: this.filterQuotes(),
          },
          () => {
            this.setState({
              filteredQuotes: this.filterQuotes(),
              categories: categories,
            });
          }
        );
      }
    });
  };

  handleAdd = (event) => {
    event.preventDefault();

    let category = event.target[0].value;
    let merchant = event.target[1].value;
    let name = event.target[2].value;
    let unit = event.target[3].value;
    let unitPrice = event.target[4].value;
    let dimensions = event.target[5].value;

    let newQuote = {
      category,
      merchant,
      name,
      unit,
      unitPrice,
      dimensions,
    };

    createQuote(newQuote, [this.state.username, this.state.password]).then(
      () => {
        this.refreshState();
      }
    );

    this.toggleAddModal();
  };

  // Deprecated since this would launch even on login screen - component is mounted even if displayed conditionally.
  // componentDidMount() {
  //   this.refreshState(true);
  // }

  filterQuotes = () => {
    let activeFilter = this.state.activeFilter;
    let query = this.state.query;
    let quotes = this.state.quotes;

    let searchedQuotes = quotes.filter((quote) =>
      quote.name.toLowerCase().includes(query.toLowerCase())
    );

    let newQuotes =
      activeFilter === "Tout" || activeFilter === ""
        ? searchedQuotes
        : searchedQuotes.filter((quote) => quote.category === activeFilter);

    this.setState({
      filteredQuotes: newQuotes,
    });

    return newQuotes;
  };

  handleSearch = (event) => {
    this.setState(
      {
        query: event.target.value,
      },
      () => this.filterQuotes()
    );
  };

  handleFilter = (event) => {
    this.setState(
      {
        activeFilter: event.target.value,
      },
      () => this.filterQuotes()
    );
  };

  render() {
    return (
      <React.Fragment>
        <Row className="justify-content-md-center align-items-center">
          <Col className="col-auto">
            <Button className="m-3" onClick={() => this.toggleAddModal()}>
              Ajouter une offre
            </Button>
          </Col>
          <Col className="col-4">
            <Form.Control onChange={(e) => this.handleFilter(e)} as="select">
              <option key="Tout">Tout</option>
              {this.state.categories.map((category) => {
                return <option key={category}>{category}</option>;
              })}
            </Form.Control>
          </Col>
          <Col className="col-4">
            <Form.Control
              placeholder="Rercherche..."
              onChange={(e) => this.handleSearch(e)}
            />
          </Col>
        </Row>
        <Modal show={this.state.showAddModal} onHide={this.toggleAddModal}>
          <MyModal type="add" handleClick={this.handleAdd} />
        </Modal>

        <Modal
          show={this.state.showModifyModal}
          onHide={this.toggleModifyModal}
        >
          <MyModal
            type="modify"
            id={this.state.id}
            handleClick={this.handleModifyClick}
          />
        </Modal>

        <BootstrapTable
          bootstrap4
          keyField="id"
          data={this.state.filteredQuotes}
          columns={this.columns}
          defaultSorted={this.defaultSorted}
        />
      </React.Fragment>
    );
  }
}
