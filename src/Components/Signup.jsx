import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../client/src/graphql/mutations.js';



// Validation schema using Yup
const FormSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("First Name is required"),
    lastName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Last Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    phoneno: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
        .required("Phone number is required"),
    role: Yup.string().required("Role is required") ,// Add role to validation schema
    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

});

function Signup() {
    const [signup] = useMutation(SIGNUP_MUTATION);
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h1>TO DO APP</h1>
            <h2>Sign Up</h2>
            <Formik
                initialValues={{ firstName: "", lastName: "", email: "", phoneno: "", role: "" ,password: "" }} // Add role to initial values
                validationSchema={FormSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    


                    try {
                        const { data } = await signup({ variables: values });
                        if (data && data.signup && data.signup.token) {
                            localStorage.setItem('authToken', data.signup.token);
                            alert('User created successfully using GraphQL and also token in stored in local storage');
                            resetForm();
                        } 
                        else {
                            alert('Signup failed. Please try again.');
                        }
                        
                      } catch (error) {
                        console.error("Error:", error);
                        alert('Signup failed in graphql');
                      }
                      setSubmitting(false);
                    }


                }

            

            >
           {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    className="form-control"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    className="form-control"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="form-control"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneno">Phone Number</label>
                    <Field
                    type="text"
                    name="phoneno"
                    placeholder="Enter phone number"
                    className="form-control"
                    />
                    <ErrorMessage name="phoneno" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <Field as="select" name="role" className="form-control">
                    <option value="">Select role</option>
                    <option value="Admin">Admin</option>
                    <option value="Merchant">Merchant</option>
                    <option value="User">User</option>
                    </Field>
                    <ErrorMessage name="role" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="form-control"
                    onChange={handleChange}
                    value={values.password}
                    />
                    {touched.password && errors.password && (
                    <div className="text-danger">{errors.password}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                </form>
            )}
            </Formik>
        </div>
    );
}

export default Signup;