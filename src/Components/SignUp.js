import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../API.js'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {UserContext} from './App.js'





const formDefault={
    username:'',
    first_name:'',
    last_name:'',
    password:'',
    email:'',
    birthday: new Date().toISOString()
}
export default function SignUp(){
    const [formData, setFormData] =useState(formDefault)
    const navigate = useNavigate();
    const [user,setUser] = useContext(UserContext)

    function handleChange(e){
        setFormData(d=>({...d,[e.target.id]:e.target.value}))
    }
    async function handleSubmit(e){
        e.preventDefault();
        console.log(formData)
        const result = await API.auth.signup(formData)
        if(result.token){
            setUser({token:result.token})
            navigate('/')
        }
        // if(result.error){
        // }
    }





    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="sky-View@polaris.com" value={formData.email}onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="first_name">First Name</Label>
                    <Input type="text" name="first_name" id="first_name" placeholder="Galileo" value={formData.first_name}onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="last_name">Last Name</Label>
                    <Input type="text" name="last_name" id="last_name" placeholder="Galilei" value={formData.last_name}onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="StarMan" value={formData.username}onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                        <Label for="exampleDate">
                        Birthday
                        </Label>
                        <Input
                        id="birthday"
                        name="birthday"
                        placeholder="02/15/1564"
                        type="date"
                        value={formData.birthday}onChange={handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="ConstellationLover225" value={formData.password}onChange={handleChange} />
                </FormGroup>
            
                
                
                <Button>Submit</Button>
            </Form>

        </div>
      
    );
}
