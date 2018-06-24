import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const renderFields = formValues => {
  return formFields.map(field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <h5>{formValues[field.name]}</h5>
      </div>
    );
  });
};

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  console.log(formValues);
  return (
    <div className="">
      <h4>Please review the values submitted</h4>
      {renderFields(formValues)}
      <button
        className="btn-flat yellow darken-3 white-text"
        onClick={onCancel}
      >
        Go Back
      </button>
      <button
        className="btn-flat green white-text right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return { formValues: state.form.surveyForm && state.form.surveyForm.values };
};
export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
