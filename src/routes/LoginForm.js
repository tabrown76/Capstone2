import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Context} from "../contexts/Context";
import GoogleLogin from "../helpers/GoogleLogin";
import "../styles/Forms.css"

/**
 * LoginForm component that provides a form for user login.
 * It includes fields for username and password and a Google login option.
 * 
 * @component
 * @example
 * return (
 *   <LoginForm />
 * )
 */
const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useContext(Context);

    const [formData, setFormData] = useState({
        username: '',
        password:''
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
   * Handles form submission for user login.
   * 
   * @param {Object} e - The event object.
   * @async
   */
    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(formData);
        setFormData({
            username: '',
            password: ''
        });
        navigate('/');
    }

    return (
        <>
            <Form className="card" onSubmit={handleSubmit}>
              <div>
                <header className="signup-header">
                  <GoogleLogin />
                </header>
              </div>
              <FormGroup>
                <Label for="username" >Username</Label>
                <Input 
                    className="Form-input text-input" 
                    type="text" 
                    name="username" 
                    id="username" 
                    placeholder="Username" 
                    onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="password" >Password</Label>
                <Input type="password" name="password" id="password" placeholder="Password" onChange={handleChange}/>
              </FormGroup>
              <Button className="Button">Submit</Button>
            </Form>
        </>
    )
}

export default LoginForm;