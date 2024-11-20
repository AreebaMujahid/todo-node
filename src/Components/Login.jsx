import React from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import { LOGIN_MUTATION } from '../client/src/graphql/mutations.js';
import { useMutation } from '@apollo/client';


// Validation schema using Yup
const FormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

function Login() {
    const [login] = useMutation(LOGIN_MUTATION);
    const navigate = useNavigate(); // Initialize navigate function

    return (
        
        <div className="container mt-5">
            <h1>To Do App</h1>
            <h2>Login Here</h2>
            <Formik
                initialValues={{ email: "" ,password:""}}
                validationSchema={FormSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    console.log("Submitting values are")
                    try {
                      const { data } = await login({ variables: values });
          
                      if (data && data.login && data.login.token) {
                        // Store the token in localStorage
                        localStorage.setItem('authToken', data.login.token);
                        alert('User logged in successfully');
                        resetForm();
                        navigate('/todo'); // Redirect to the todo page
                      }
                    } catch (error) {
                      console.error("Login failed:", error);
                      alert('Login failed: ' + error.message);
                      console.log("Submitted values:", values);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                
                
            >
                {({ isSubmitting }) => (
                    <Form>
                        

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneno">Password</label>
                            <Field
                                type="passowrd"
                                name="password"
                                placeholder="Enter password"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
