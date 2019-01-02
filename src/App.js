import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { slide as Menu } from "react-burger-menu";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userHasAuthenticated(true);
    }
  }
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };
  handleLogout = event => {
    this.userHasAuthenticated(false);
  };
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div>
        <Menu
          isOpen={this.state.sidebarOpen}
          outerContainerId={"root"}
          customBurgerIcon={false}
          customCrossIcon={false}
        >
          <ul className="custom-sidedrawer">
            <li>
              <Link to="/staff"> staff </Link>
            </li>
          </ul>
        </Menu>
        <div className="App container" id="app-container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <button
                type="button"
                className="navbar-toggle"
                onClick={this.onSetSidebarOpen}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Navbar.Brand>
                <Link to="/">Our School</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <Fragment>
                  {this.state.isAuthenticated && (
                    <LinkContainer to="/login" onClick={this.handleLogout}>
                      <NavItem>Logout</NavItem>
                    </LinkContainer>
                  )}
                </Fragment>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      </div>
    );
  }
}
export default App;
