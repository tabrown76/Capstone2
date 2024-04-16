import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Context} from "../Context";
import "../styles/Forms.css"

const LoginForm = () => {
    const navigate = useNavigate();
    const {login} = useContext(Context);

    const [formData, setFormData] = useState({
        username: '',
        password:''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

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