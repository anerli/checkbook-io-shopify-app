import React, { Component } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import Axios from "axios";
import ReactQueryParams from "react-query-params";
import Appbar from "./react_components/Appbar";
import Status from "./react_components/StatusCard";
import ProgBar from "./react_components/ProgressBar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
const request = require("request");
const apiKey = process.env.CHECKBOOK_API_KEY;
const clientId = process.env.CHECKBOOK_CLIENT_ID;
const apiSecret = process.env.CHECKBOOK_API_SECRET;

const useStyles = makeStyles(theme => ({
  paper: {
    color: "rgb(240,240,240)",
    display: "flex",
    flexWrap: "wrap",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    "& > *": {
      margin: theme.spacing(10),
      width: theme.spacing(20),
      height: theme.spacing(30),
      padding: theme.spacing(20)
    }
  }
}));
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
        <div>
          <Appbar></Appbar>
          <StatusComponent status={this.state.status} />
        </div>
        <div>Email: {this.queryParams.email}</div>
        <div>Cost: {this.queryParams.cost}</div>
        <div>Invoice ID: {this.state.invoice_id}</div>
        <div>Status: {this.state.status}</div>
      </Router>
    );
  }
}

function StatusComponent(props) {
  if (props.status == "UNPAID") {
    return (
      <div>
        <div className={useStyles.paper}>
          <Status />
          <Paper elevation={4}>
            <ProgBar></ProgBar>
          </Paper>
        </div>
      </div>
    );
  } else if (props.status == "PAID") {
    //return <h1>Transaction Completed!</h1>;
    return (
      <div style={{padding:50}}>
        <div style={{
          
          color: 'rgb(240,240,240)',
          //display: 'flex',
          //flexWrap: 'wrap',
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          /*
          '& > *': {
            margin: 10,
            width: 20,
            height: 30,
            padding: 20,
          },
          */
          
          //width: "50%",
          //height: "50%",
          //padding:500,
        }}>
          <div style={{padding:50}}>
          <Paper elevation={4}>
            
            <h1>Transaction Completed!</h1>
            <a style={{alignSelf:"center"}} href="https://shopify.com" class="w3-btn w3-black">Back to Shopify</a>
          </Paper>
          </div>
        </div>
      </div>
    );
    
  } else if (props.status == ""){
    return <p></p>
  }
  else{
    return <p></p>;
  }
}
