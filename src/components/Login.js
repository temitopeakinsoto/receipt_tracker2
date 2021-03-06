import React, {useState} from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { Button, Header, Form as SemForm } from "semantic-ui-react";
import { connect } from "react-redux";
import { addUsernameToState } from "../actions/addUsernameToState";

import "semantic-ui-css/semantic.min.css";


const Login = ({ errors, touched }) => {
  const [ incorrect, setIncorrect ] = useState(false)
  return (
    <SemForm className="formContainers">
      <Form className="login-Form">
        <h1>Login</h1>
        <SemForm.Field>
          <Field
            name="username"
            type="text"
            autoComplete="off"
            placeholder="username"
          />
          {touched.username && errors.username && (
            <p className="errors">{errors.username}</p>
          )}
        </SemForm.Field>
        <SemForm.Field>
          <Field
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Password"
          />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </SemForm.Field>
        <Button className="submit" type="submit">
          Login &rarr;
        </Button>
        <p></p>
        <Header className="login-register" as="h4">Don't have an account yet?
          <NavLink to="/register"> Sign Up &rarr;</NavLink>
        </Header>
      </Form>
      {incorrect && <h2>username or password incorrect</h2>}
    </SemForm>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  }),

  handleSubmit(values, { props }) {
    console.log("props details are", props)
    axios
      .post("https://receipt-tracker-api.herokuapp.com/login", values)
      .then(res => {
        //console.log(values);
        //console.log(res);
        localStorage.setItem("token", res.data.token);
        props.addUsernameToState(values.username);
        props.history.push("/");
      })
      .catch(err => {
        //setIncorrect(true)
        // console.log(values, err.response.data);
        console.log(err.response.data);
      });
  }
})(Login);

const mapStateToProps = state => ({
  state: state
});

export default connect(
  mapStateToProps,
  { addUsernameToState }
)(FormikForm);
