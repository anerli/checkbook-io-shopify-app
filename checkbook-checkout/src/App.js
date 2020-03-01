import React, { Component } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import Axios from "axios";
import ReactQueryParams from 'react-query-params';

const request = require("request");

const apiKey = process.env.CHECKBOOK_API_KEY;
const clientId = process.env.CHECKBOOK_CLIENT_ID;
const apiSecret = process.env.CHECKBOOK_API_SECRET;

export default class App extends ReactQueryParams {
  constructor(props) {
    super(props);
    this.state = {
      invoice_id: "",
      status: ""
    };
  }

  componentDidMount() {
    //let query = useQuery();
    var self = this;
    try {
      setInterval(async () => {
        Axios.get(
          "http://localhost:8000/invoice?id=" + this.state.invoice_id
        ).then(response => {
          self.setState({
            status: response.data
          });
        });
      }, 1000);
    } catch (e) {
      console.log(e);
    }
    const postObject = {
      amount: parseFloat(this.queryParams.cost),
      description: "Potato Purchase",
      name: "Mitra",
      recipient: this.queryParams.email
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        //"Authorization":"d6aa2703655f4ba2af2a56202961ca86:dXbCgzYBMibj8ZwuQMd2NXr6rtvjZ8",
        Authorization:
          "1b0b61ab6279c43ddae790a75774400f:e7a4e3523f08bfe153e56b192b919036",
        Accept: "application/json"
      }
    };

    Axios.post("http://localhost:8000/invoice", postObject, config).then(
      function(response) {
        let id = response.data;
        console.log(id);
        self.setState({
          invoice_id: id
        });
      }
    );
  }
  
  render() {

    return (
      <Router>
       
        <h1>Email: {this.queryParams.email}</h1>
        <h1>Cost: {this.queryParams.cost}</h1>
        <h1>Invoice ID: {this.state.invoice_id}</h1>
        <h1>Status: {this.state.status}</h1>
      </Router>
    );
  }
}
