import React, { Component } from "react";
import "./Home.css";
import { Redirect } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstarp.less");

export default class Home extends Component {
  //MODAL
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      show: false,
      data: [],
      activePage: 1
    };
  }
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("data"));
    this.setState({ data });
  }
  createTable(data = [], activePage = 1, pageCount = 10) {
    let table = [];
    const start = (activePage - 1) * pageCount;
    const end = activePage * pageCount;
    const itemCount = data.length;
    for (let i = start; itemCount && i < itemCount && i < end; i++) {
      const school = data[i];
      table.push(
        <tr key={school.id}>
          <td>{school.class}</td>
          <td>{school.section}</td>
        </tr>
      );
    }
    return table;
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    const { show, activePage, data } = this.state;
    const pageCount = 10;
    const totalItemsCount = data.length;
    const newClass = "hi";
    const dataNew = [...this.state.data, newClass];
    this.setState({ dataNew });
    return [
      <div>
        <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
          Add class
        </Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Class</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label>
                Class:
                <input type="text" name="class" />
              </label>
              <label>
                Section:
                <input type="text" name="section" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>,

      <div className="Home">
        {!this.props.isAuthenticated && <Redirect to="/login" />}
        <div className="lander">
          <table>
            <tr>
              <th>Classes</th>
              <th>Sections</th>
            </tr>
            {this.createTable(data, activePage, pageCount)}
          </table>
        </div>
      </div>,

      <div>
        <Pagination
          activePage={activePage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    ];
  }
}
