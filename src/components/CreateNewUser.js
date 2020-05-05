import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Button, Form as SemForm } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Animate, HeadShake, ZoomIn } from "animate-css-styled-components";

const Login = ({ errors, touched }) => {
  return (
    <SemForm className="formContainers">
      <Form className="login-Form">
        <h1>Create an account:</h1>
        <HeadShake
          animationIn={ZoomIn}
          duration="3s"
          iterationCount='5'
        >
          {/* {console.log(Animate)} */}
          
          
          {errors.takenCreds && <p>{errors.takenCreds}</p>}
        </HeadShake>

        <SemForm.Field>
          <Field
            name="username"
            type="text"
            autoComplete="off"
            placeholder="username"
          />
          {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
          )}
        </SemForm.Field>
        <SemForm.Field>
          <Field
            name="email"
            type="email"
            autoComplete="off"
            placeholder="email"
          />
          {touched.email && errors.email && (
            <p className="errorStyle">{errors.email}</p>
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
            <p className="error">{errors.password}</p>
          )}
        </SemForm.Field>
        <Button
          style={{
            margin: "1em auto",
            backgroundColor: "#25BB49",
            color: "white"
          }}
          type="submit"
        >
          Sign Up &rarr;
        </Button>
      </Form>
    </SemForm>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ username, email, password }) {
    return {
      username: username || "",
      email: email || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string()
      .min(8, "Password must be a minimum of 8 characters or longer")
      .required()
  }),

  handleSubmit(values, { props, setErrors }) {
    if (values.email == "waffle@syrup.com") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://receipt-tracker-api.herokuapp.com/register", values)
        .then(res => {
          console.log(values);
          console.log(res);
          props.history.push("/login");
          //   localStorage.setItem('token', res.data.payload);
        })
        .catch(err => {
          console.log(values);
          console.log(err.response);
          if (err.response.status == 400) {
            console.log(err.response.data);
            props.history.push(
              "./sign-up",
              setErrors({
                takenCreds: "That email or username is already in use!"
              })
            );
          }
        });
    }
  }
})(Login);

export default FormikForm;
