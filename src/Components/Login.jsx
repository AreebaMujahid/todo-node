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
    phoneno: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
        .required("Phone number is required")
});

function Login() {
    const [login] = useMutation(LOGIN_MUTATION);
    const navigate = useNavigate(); // Initialize navigate function

    return (
        
        <div className="container mt-5">
            <h1>To Do App</h1>
            <h2>Login Here</h2>
            <Formik
                initialValues={{ email: "" ,phoneno:""}}
                validationSchema={FormSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        
                        const { data } = await login({ variables: values });
                        alert('User login successfully using graphql');
                        resetForm();
                        navigate('/todo');
                      } catch (error) {
                        console.error("Error:", error);
                        alert('login failed in graphql');
                        console.log("Submitted values:", values); // Log values to check the structure
                      }
                      setSubmitting(false);
                    }
                    
                }
                
                
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
                            <label htmlFor="phoneno">Phone no</label>
                            <Field
                                type="phoneno"
                                name="phoneno"
                                placeholder="Enter phone no"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="phoneno"
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
