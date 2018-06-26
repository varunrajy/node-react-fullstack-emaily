import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    console.log("componentDidMount");
    this.props.fetchSurveys();
  }

  renderSurveys() {
    console.log(this.props.surveys);
    return this.props.surveys.map(({ title, body, yes, no, _id, dateSent }) => {
      return (
        <div key={_id} className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{title}</span>
            <p>{body}</p>
            <label className="">
              Last update : {new Date(dateSent).toLocaleDateString()}
            </label>
            <label className="right">
              Date Sent : {new Date(dateSent).toLocaleDateString()}
            </label>
          </div>
          <div className="card-action">
            <a>Yes: {yes}</a>
            <a>No : {no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => {
  console.log("inside mapstatetoprops : ", surveys);
  return { surveys };
};

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
