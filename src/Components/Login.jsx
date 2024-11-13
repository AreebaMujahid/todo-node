import React from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";

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
                        const response = await fetch("http://localhost:4000/Login", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        });
                
                        if (response.ok) {
                            const data = await response.json();
                
                            if (data.token) {
                                // Store the JWT token in localStorage
                                localStorage.setItem('authToken', data.token);
                                localStorage.setItem('userEmail', values.email);
                                console.log("Login successful and token stored!");
                
                                alert("Login form submitted successfully, and token stored on the client.");
                                resetForm();
                                navigate("/todo"); 

                            } else {
                                console.error(data.message);
                                alert("Login failed. Please try again.");
                            }
                        } else {
                            alert("Login failed. Please try again.");
                        }
                    } catch (error) {
                        console.error("Error:", error);
                        alert("There was an error submitting the form.");
                    }
                    setSubmitting(false);
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
