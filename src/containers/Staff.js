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
      staff: [],
      activePage: 1
    };
  }
  componentDidMount() {
    const staff = JSON.parse(localStorage.getItem("staff"));
    this.setState({ staff });
  }
  createTable(staff = [], activePage = 1, pageCount = 10) {
    let table = [];
    const start = (activePage - 1) * pageCount;
    const end = activePage * pageCount;
    const itemCount = staff.length;
    for (let i = start; itemCount && i < itemCount && i < end; i++) {
      const school = staff[i];
      table.push(
        <tr key={school.id}>
          <td>{school.name}</td>
          <td>{school.desg}</td>
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
    const { show, activePage, staff } = this.state;
    const pageCount = 10;
    const totalItemsCount = staff.length;
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
                Name:
                <input type="text" name="class" />
              </label>
              <label>
                Designations:
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
              <th>Name</th>
              <th>Designations</th>
            </tr>
            {this.createTable(staff, activePage, pageCount)}
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
