import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Context} from "../contexts/Context";
import GoogleRegister from "../helpers/GoogleRegister";
import "../styles/Forms.css"

/**
 * SignupForm component that provides a form for user registration.
 * It includes fields for username, first name, last name, email, and password, and a Google registration option.
 * 
 * @component
 * @example
 * return (
 *   <SignupForm />
 * )
 */
const SignupForm = () => {
    const navigate = useNavigate();
    const {postRegistrationData} = useContext(Context);

    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    /**
   * Handles changes to the form input fields.
   * 
   * @param {Object} e - The event object.
   */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    /**
   * Handles form submission for user registration.
   * 
   * @param {Object} e - The event object.
   */
    const handleSubmit = (e) => {
        e.preventDefault();
        postRegistrationData(formData);
        setFormData({
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });
        navigate('/');
    }

    return (
        <>
            <Form className="card" onSubmit={handleSubmit}>
              <div>
                <header className="signup-header">
                  <GoogleRegister />
                </header>
              </div>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input 
                    className="Form-input text-input" 
                    type="text" 
                    name="username" 
                    id="username" 
                    placeholder="Username" 
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input 
                    className="Form-input text-input" 
                    type="text" 
                    name="firstName" 
                    id="firstName" 
                    placeholder="First Name" 
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input 
                    className="Form-input text-input" 
                    type="text" 
                    name="lastName" 
                    id="lastName" 
                    placeholder="Last Name" 
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input 
                    className="Form-input" 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Email" 
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input 
                    className="Form-input" 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Confirm Password</Label>
                  <Input 
                    className="Form-input" 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    onChange={handleChange} />
                </FormGroup>
                <Button className="Button">Submit</Button>
            </Form>
        </>
    )
}

export default SignupForm;