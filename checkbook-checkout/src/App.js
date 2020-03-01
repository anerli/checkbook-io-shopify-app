import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import Axios from "axios";

const request = require('request');

const apiKey = process.env.CHECKBOOK_API_KEY;
const clientId = process.env.CHECKBOOK_CLIENT_ID;
const apiSecret = process.env.CHECKBOOK_API_SECRET;


// React Router does not have any opinions about
// how you should parse URL query strings.
//
// If you use simple key=value query strings and
// you do not need to support IE 11, you can use
// the browser's built-in URLSearchParams API.
//
// If your query strings contain array or object
// syntax, you'll probably need to bring your own
// query parsing function.

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      invoice_id: "",
      status: ""
    }
  }
  
  componentDidMount(){
    //Axios.post('http://localhost:8000/invoice', {}, {});
    /*
    var options = {
      method: 'POST',
      url: 'https://demo.checkbook.io/v3/invoice',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'd6aa2703655f4ba2af2a56202961ca86:dXbCgzYBMibj8ZwuQMd2NXr6rtvjZ8'
      },
      body: '{"amount":5,"description":"Test Invoice","name":"Potato Company","recipient":"rjp1@iastate.edu"}'
    };
    
    request(options, function (error, response, body) {
      //if (error) throw new Error(error);
    
      console.log(body);
    });
    */
   var self = this;
   try {
      setInterval(async () => {
        /*
        const res = await fetch('https://api.apijson.com/...');
        const blocks = await res.json();
        const dataPanelone = blocks.panelone;
        const dataPaneltwo = blocks.paneltwo;

        this.setState({
          panelone: dataPanelone,
          paneltwo: dataPaneltwo,
        })
        */
        Axios.get("http://localhost:8000/invoice?id="+this.state.invoice_id).then((response)=>{
          self.setState({
            status:response.data
          });
        });
      }, 1000);
    } catch(e) {
      console.log(e);
    }
    
    const postObject={
      "amount":15,
      "description":"Potato Purchase",
      "name":"Mitra",
      "recipient":"rjp1@iastate.edu"
    };
    const config={
      headers:{
        "Content-Type":"application/json",
        //"Authorization":"d6aa2703655f4ba2af2a56202961ca86:dXbCgzYBMibj8ZwuQMd2NXr6rtvjZ8",
        "Authorization":"1b0b61ab6279c43ddae790a75774400f:e7a4e3523f08bfe153e56b192b919036",
        "Accept":"application/json"
      }
    };
    
    //Axios.post('https://sandbox.checkbook.io/v3/invoice', postObject, config);
    //Axios.post('https://demo.checkbook.io/v3/invoice', postObject, config);
    //let id = 
    
    Axios.post('http://localhost:8000/invoice', postObject, config).then(function(response){
      let id = response.data;
      console.log(id);
      self.setState({
        invoice_id: id
      });
    });
    //console.log(id);
    //this.setState({
    //  invoice_id: id
    //});
  }
  render(){
    return (
      <Router>
        
        <QueryParamsDemo />
      <h1>Invoice ID: {this.state.invoice_id}</h1>
      <h1>Status: {this.state.status}</h1>
      </Router>
    );
  }
}


// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QueryParamsDemo() {
  let query = useQuery();

  // Request invoice
  //Axios.get('https://swapi.co/api/people/1').then((response)=>{console.log(response)});

  /*
  const config = {
    headers: {
      "accept":'application/json',
      "content-type": "application/json",
      "authorization": "d6aa2703655f4ba2af2a56202961ca86:dXbCgzYBMibj8ZwuQMd2NXr6rtvjZ8",
      "accept":"application/json"
      //"Access-Control-Allow-Origin":"*"
      
    },
    //withCredentials: false,
    //auth: {
    //  username: 'd6aa2703655f4ba2af2a56202961ca86',
    //  password: 'dXbCgzYBMibj8ZwuQMd2NXr6rtvjZ8'
    //},
  }
  const postObject={
    //values
    "amount":query.get("cost"),
    "description":"Potato Purchase",
    "name":"Mitra",
    "recipient":query.get("email")
  }
  */
 

  return (
    <div>
      <h1>Email: {query.get("email")}</h1>
      <h1>Cost: {query.get("cost")}</h1>
    </div>
  );
}