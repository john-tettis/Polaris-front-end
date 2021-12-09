import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../API.js'
import { Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import {UserContext} from './App.js'
import validate, {notNull, noSpecialChars} from '../Helpers/Validator'





const formDefault={
    email:'',
    first_name:'',
    last_name:'',
    birthday: new Date().toISOString(),
    username:'',
    password:''
    
}
const validators = {
    email:[notNull],
    username:[notNull,noSpecialChars],
    first_name:[notNull],
    last_name:[notNull],
    password:[notNull],
    
    birthday:[notNull],
}

export default function SignUp(){
    const [formData, setFormData] =useState(formDefault)
    const navigate = useNavigate();
    const [user,setUser] = useContext(UserContext)
    const [error, setError] = useState({})

    function handleChange(e){
        setFormData(d=>({...d,[e.target.id]:e.target.value}))
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(!validate(setError,formData,validators)) return
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
                    <Input  invalid={!!error.email}type="email" name="email" id="email" placeholder="sky-View@polaris.com" value={formData.email}onChange={handleChange} />
                    <FormFeedback>{error.email}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="first_name">First Name</Label>
                    <Input invalid={!!error.first_name}type="text" name="first_name" id="first_name" placeholder="Galileo" value={formData.first_name}onChange={handleChange} />
                    <FormFeedback>{error.first_name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="last_name">Last Name</Label>
                    <Input invalid={!!error.last_name} type="text" name="last_name" id="last_name" placeholder="Galilei" value={formData.last_name}onChange={handleChange} />
                    <FormFeedback>{error.last_name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                        <Label for="exampleDate">
                        Birthday
                        </Label>
                        <Input
                        invalid={!!error.birthday}
                        id="birthday"
                        name="birthday"
                        placeholder="02/15/1564"
                        type="date"
                        value={formData.birthday}onChange={handleChange}
                        required />
                        <FormFeedback>{error.birthday}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input invalid={!!error.username} type="text" name="username" id="username" placeholder="StarMan" value={formData.username}onChange={handleChange} />
                    <FormFeedback>{error.username}</FormFeedback>
                </FormGroup>
                
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input invalid={!!error.password} type="password" name="password" id="password" placeholder="ConstellationLover225" value={formData.password}onChange={handleChange} />
                    <FormFeedback>{error.password}</FormFeedback>
                </FormGroup>
            
                
                
                <Button>Submit</Button>
            </Form>

        </div>
      
    );
}
