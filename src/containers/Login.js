import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.css";
import Home from "./Home";
import creds from "../creds.json";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const isEmailValid = email => {
  return emailRegex.test(email);
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return isEmailValid(this.state.email) && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    // may not be needed as button is disabled untill validateForm is true
    if (this.validateForm()) {
      const user = creds.find(
        cred => cred.email === email && cred.password === password
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        this.props.userHasAuthenticated(true);
      } else {
        this.setState({
          email: "",
          password: "",
          error: "UserName or Password is incorrect"
        });
      }
    }
  };

  render() {
    return (
      <div className="Login">
        {this.props.isAuthenticated && <Redirect to="/" />}
        <form onSubmit={this.handleSubmit}>
          {/* <form onSubmit={Home}> */}
          {this.state.error && (
            <Alert bsStyle="danger">{this.state.error}</Alert>
          )}
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
