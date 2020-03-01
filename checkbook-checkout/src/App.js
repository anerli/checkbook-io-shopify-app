import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import Axios from "axios";

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
  componentDidMount(){

  }
  render(){
    return (
      <Router>
        <QueryParamsDemo />
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

  

  return (
    <div>
      <h1>Email: {query.get("email")}</h1>
      <h1>Cost: {query.get("cost")}</h1>
    </div>
  );

  

}