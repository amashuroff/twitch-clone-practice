import React from "react";
import { Field, reduxForm } from "redux-form";

// generalized stream form component
class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = (props) => {
    const className = `field ${
      props.meta.error && props.meta.touched ? "error" : "" // error class will allow to display error
    }`;

    // {..props.input}
    // take all the parent props (key/val) pairs
    // add them to the input element
    return (
      <div className={className}>
        <label>{props.label}</label>
        <input {...props.input} autoComplete="off" />
        {this.renderError(props.meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Please, provide a title";
  }
  if (!formValues.description) {
    errors.description = "Please provide a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);

// redux Form takes in a singe object
// export default connect(null, { createStream })(formWrapped);
