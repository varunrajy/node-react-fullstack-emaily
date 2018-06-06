import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import * as actions from "../actions";

const Landing = () => <h2>Landing</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Dashboard = () => <h2>Dashboard</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/surveys" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
