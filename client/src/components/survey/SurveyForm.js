import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(field => {
      return (
        <Field
          type="text"
          component={SurveyField}
          {...field}
          key={field.name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveyFormSubmit)}>
          {this.renderFields()}
          <button className="btn-flat teal right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
          <Link className="red btn-flat white-text" to="/surveys">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validate = values => {
  const errors = {};
  formFields.forEach(({ name, error }) => {
    if (!values[name]) {
      errors[name] = error;
    }
  });
  const emails = (values.recipients || "")
    .split(",")
    .map(email => email.trim())
    .filter(email => !re.test(email));
  if (emails.length) {
    errors.recipients =
      errors.recipients || `Please fix the following email : ${emails}`;
  }
  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
